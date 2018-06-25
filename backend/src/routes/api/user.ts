import mongoose from "mongoose";
import passport from "passport";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as User, UserModel } from "../../models/user";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById((<any>req).payload.id).then((user: UserModel) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    return res.json({
      success: true,
      user: user.toAuthJSON()
    });
  }).catch(next);
});

router.put("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById((<any>req).payload.id).then((user: UserModel) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

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

export default router;
