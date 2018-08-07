import passport from "passport";
import fs from "fs";
import AWS from "aws-sdk";
import { Router, Request, Response, NextFunction } from "express";
import { default as User, UserModel } from "../../models/user";
import { default as Wallet, WalletModel } from "../../models/wallet";
import { default as KycStatus, KycStatusModel } from "../../models/kyc_status";
import { default as Log } from "../../models/log";
import { baseUri, redisUri } from "../../config";
import redis from "redis";
import winston from "winston";

const router = Router();
const client = redis.createClient(redisUri);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user.email) {
    return res.status(422).json({
      success: false,
      message: "email can't be blank"
    });
  }

  if (!req.body.user.password) {
    return res.status(422).json({
      success: false,
      message: "password can't be blank"
    });
  }

  passport.authenticate("local", { session: false }, (err: Error, user: UserModel, info: any) => {
    if (err) { return next(err); }

    if (user) {
      if (!user.isMailVerified) {
        return res.status(422).json({
          success: false,
          message: "account is not verified",
        });
      }

      (<any>user).token = user.generateJWT();
      return res.json({
        success: true,
        user: user.toAuthJSON()
      });
    } else {
      return res.status(422).json({
        success: false,
        message: info.errors
      });
    }
  })(req, res, next);
});

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const user = new User();
  const wallet = new Wallet();
  const kycStatus = new KycStatus();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.isDocumentsSubmitted = false;
  user.isMailVerified = false,
  user.setPassword(req.body.user.password);

  // TODO: must store verification token with associated user identifier
  // in redis with expiration time
  const verificationToken = Math.random().toString(36).substring(7);
  let content = fs.readFileSync("./templates/email/confirm_mail_register.html", "utf8");
  content = content.replace(/base_url/g, baseUri);
  content = content.replace(/sf_verification_code/g, verificationToken);

  const params = {
    Destination: {
      ToAddresses: [ user.email ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: content
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "SmartFunding Registration"
      }
    },
    Source: "noreply@ses.smartfunding.io"
  };

  User.findOne({ "email": user.email }).then((u: UserModel) => {
    if (u) {
      return res.status(422).json({
        success: false,
        message: "email is already registered"
      });
    }

    user.save().then((t: UserModel) => {
      AWS.config.update({ region: "us-west-2" });
      const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
        .sendEmail(params)
        .promise();

      const to = Buffer.from(verificationToken).toString("base64");
      client.hmset(`cfa:${to}`, "id", t._id.toString(), "token", verificationToken);

      sendPromise
        .then(data => console.log(data))
        .catch(err => console.error(err));

      wallet.user = t._id;
      wallet.balance = 0.0;
      wallet.save().then((w: WalletModel) => {
        t.wallet = w._id;

        kycStatus.status = "new";
        kycStatus.save().then((k: KycStatusModel) => {
          t.kycStatus = k._id;
          t.save();
        });
      });

      return res.json({
        success: true,
        user: t.toAuthJSON(),
      });
    }).catch(next);

  }).catch(next);
});

router.post("/register/:token", (req: Request, res: Response, next: NextFunction) => {
  const token = req.params.token;
  const to = Buffer.from(token).toString("base64");
  client.hgetall(`cfa:${to}`, function(err, obj) {
    if (err || !obj) {
      return res.json({
        success: false,
      });
    }

    if (obj.token === token) {
      User.findById(obj.id).then((user: UserModel) => {
        user.isMailVerified = true;
        user.save();
      }).catch(next);

      return res.json({
        success: true,
      });
    }

    return res.json({
      success: false,
    });
  });
});

router.post("/recover", (req: Request, res: Response, next: NextFunction) => {
  const user = new User();
  user.email = req.body.user.email;

  const verificationToken = Math.random().toString(36).substring(7);
  let content = fs.readFileSync("./templates/email/confirm_mail_recover.html", "utf8");
  content = content.replace(/base_url/g, baseUri);
  content = content.replace(/sf_verification_code/g, verificationToken);

  const params = {
    Destination: {
      ToAddresses: [ user.email ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: content
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "SmartFunding Recover Password"
      }
    },
    Source: "noreply@ses.smartfunding.io",
  };

  User.findOne({ "email": user.email }).then((t: UserModel) => {
    if (!t) {
      return res.status(401).json({
        success: false,
        message: "email not found"
      });
    }

    const to = Buffer.from(verificationToken).toString("base64");
    client.hmset(`rca:${to}`, "id", t._id.toString(), "token", verificationToken);

    // TODO: must go async or in queue handler so no blocking
    AWS.config.update({ region: "us-west-2" });
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    sendPromise
      .then(function(data) {
        winston.info("data", data);
      })
      .catch(function(err) {
        winston.error("error", err);
      });

    return res.json({
      success: true,
      user: t.toAuthJSON()
    });
  }).catch(next);
});

router.post("/recover/:token", (req: Request, res: Response, next: NextFunction) => {
  const token = req.params.token;
  const to = Buffer.from(token).toString("base64");
  client.hgetall(`rca:${to}`, function(err, obj) {
    if (err || !obj) {
      return res.json({
        success: false,
      });
    }

    if (obj.token === token) {
      User.findById(obj.id).then((user: UserModel) => {
          user.setPassword("temporary"); // TODO
          user.save().then((t: UserModel) => {
            logAction(`Password for User ${user.username} has been reset`);
          });
      }).catch(next);

      return res.json({
        success: true,
      });
    }

    return res.json({
      success: false,
    });
  });
});

function logAction(message: string) {
    const log = new Log();
    log.message = message;
    return log.save();
}

export default router;
