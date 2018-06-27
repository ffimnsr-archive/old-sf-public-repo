import passport from "passport";
import fs from "fs";
import AWS from "aws-sdk";
import { Router, Request, Response, NextFunction } from "express";
import { default as User, UserModel } from "../../models/user";
import { default as Wallet, WalletModel } from "../../models/wallet";
import { default as KycStatus, KycStatusModel } from "../../models/kyc_status";
import { constant } from "async";

const router = Router();

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

  // TODO: must go async
  user.save().then((t: UserModel) => {
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    sendPromise
      .then(data => console.log(data))
      .catch(err => console.error(err));

    wallet.user = user._id;
    wallet.balance = 0.0;
    wallet.save();

    kycStatus.status = "new";
    kycStatus.save();

    return res.json({
      success: true,
      user: t.toAuthJSON(),
    });
  }).catch(next);
});

router.post("/register/:token", (req: Request, res: Response, next: NextFunction) => {
  // TODO: must get and verify to and from redis with expiration time
});

router.post("/recover", (req: Request, res: Response, next: NextFunction) => {
  const user = new User();
  user.email = req.body.user.email;

  let content = fs.readFileSync("./templates/email/confirm_mail_recover.html", "utf8");
  content = content.replace("/sf_verification_code/g", user.username);

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

  User.findOne({ "email": user.email }).then((user: UserModel) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "email not found"
      });
    }

    // TODO: must go async or in queue handler so no blocking
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    sendPromise
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.error("error", err);
      });

    return res.json({
      success: true,
      user: user.toAuthJSON()
    });
  }).catch(next);
});

router.post("/recover/:token", (req: Request, res: Response, next: NextFunction) => {
  // TODO: must get and verify to and from redis with expiration time
});

export default router;
