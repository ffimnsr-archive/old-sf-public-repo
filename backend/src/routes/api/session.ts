import passport from "passport";
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
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save().then((t: UserModel) => {
    console.log(t);
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});


export default router;
