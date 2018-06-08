import mongoose from "mongoose";
import passport from "passport";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { UserModel } from "../../models/user";

const User = mongoose.model("User");
const router = Router();

router.get("/user", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById((<any>req).payload.id).then((user: UserModel) => {
    if (!user) { return res.sendStatus(401); }

    return res.json({
      success: true,
      user: user.toAuthJSON()
    });
  }).catch(next);
});

router.put("/user", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.payload.id).then((user: UserModel) => {
    if (!user) { return res.sendStatus(401); }

    if (typeof req.body.user.username !== "undefined") {
      user.username = req.body.user.username;
    }

    if (typeof req.body.user.email !== "undefined") {
      user.email = req.body.user.email;
    }

    if (typeof req.body.user.bio !== "undefined") {
      user.bio = req.body.user.bio;
    }

    if (typeof req.body.user.image !== "undefined") {
      user.image = req.body.user.image;
    }

    if (typeof req.body.user.password !== "undefined") {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(() => {
      return res.json({
        success: true,
        user: user.toAuthJSON()
      });
    });
  }).catch(next);
});

router.post("/users/login", (req: Request, res: Response, next: NextFunction) => {
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
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post("/users", (req: Request, res: Response, next: NextFunction) => {
  const user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save().then(() => {
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

export default router;
