import mongoose from "mongoose";
import passport from "passport";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as User, UserModel } from "../../models/user";
import { default as Address, AddressModel } from "../../models/address";
import { default as Wallet, WalletModel } from "../../models/wallet";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById((<any>req).payload.id).populate("wallet").then((user: UserModel) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    return res.json({
      success: true,
      user: user.toAuthJSON(),
      wallet: user.wallet,
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

    user.save().then((t: UserModel) => {
      console.log(t.toAuthJSON());
      return res.status(200).json({
        success: true,
        user: t.toAuthJSON()
      });
    });
  }).catch(next);
});

router.put("/details", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById((<any>req).payload.id).then((user: UserModel) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    if (typeof req.body.user.forename !== "undefined") {
      user.forename = req.body.user.forename;
    }

    if (typeof req.body.user.surname !== "undefined") {
      user.surname = req.body.user.surname;
    }

    const address = new Address({
      user: user._id,
      address1: req.body.user.address1,
      address2: req.body.user.address2,
      city: req.body.user.city,
      stateProvince: req.body.user.stateProvince,
      postalCode: req.body.user.postalCode,
      active: false,
    });

    user.save().then((t: UserModel) => {
      address.save();

      return res.status(200).json({
        success: true,
        user: t.toAuthJSON()
      });
    });
  }).catch(next);
});

router.put("/image", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById((<any>req).payload.id).then((user: UserModel) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    if (typeof req.body.user.image !== "undefined") {
      user.forename = req.body.user.image;
    }

    user.save().then((t: UserModel) => {
      return res.status(200).json({
        success: true,
        user: t.toAuthJSON()
      });
    });
  }).catch(next);
});

router.put("/type", auth.required, (req: Request, res: Response, next: NextFunction) => {
  User.findById((<any>req).payload.id).then((user: UserModel) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    if (typeof req.body.user.typeset !== "undefined") {
      user.typeset = req.body.user.typeset;
    }

    user.save().then((t: UserModel) => {
      return res.status(200).json({
        success: true,
        user: t.toAuthJSON()
      });
    });
  }).catch(next);
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
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

export default router;
