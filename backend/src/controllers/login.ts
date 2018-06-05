import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { Request, Response, NextFunction } from "express";

export let getLogin = (req: Request, res: Response) => {
  res.status(200).json({
    success: true
  });
};

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exist!"
      });
    }

    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);j
        }

        res.status(200).json({
          success: true
        });
      });
    });
  });
};

export let getAccount = (req: Request, res: Response) => {
  res.status(200).json({
    success: true
  });
};
