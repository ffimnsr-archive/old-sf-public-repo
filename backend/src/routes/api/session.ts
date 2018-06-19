import passport from "passport";
import AWS from "aws-sdk";
import { Router, Request, Response, NextFunction } from "express";
import { default as User, UserModel } from "../../models/user";

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

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  const params = {
    Destination: {
      ToAddresses: [ user.email ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1>Hello</h1>"
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "SmartFunding Registration"
      }
    },
    Source: "noreply@ses.smartfunding.io"
  };

  user.save().then((t: UserModel) => {
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    sendPromise
      .then(data => console.log(data))
      .catch(err => console.error(err));

    return res.json({
      success: true,
      user: t.toAuthJSON(),
    });
  }).catch(next);
});

router.post("/recover", (req: Request, res: Response, next: NextFunction) => {
  const user = new User();
  user.email = req.body.user.email;

  const params = {
    Destination: {
      ToAddresses: [ user.email ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1>Hello</h1>"
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "SmartFunding Recover Password"
      }
    },
    Source: "noreply@ses.smartfunding.io",
  };

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
  });
});

export default router;
