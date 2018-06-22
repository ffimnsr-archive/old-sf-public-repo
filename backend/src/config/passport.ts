import passport from "passport";
import passportLocal from "passport-local";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { default as User, UserModel } from "../models/user";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
  usernameField: "user[email]",
  passwordField: "user[password]"
}, (email: string, password: string, done: any) => {
  User.findOne({ email: email.toLocaleLowerCase() }).then((user: UserModel) => {
    if (!user || !user.validPassword(password)) {
      return done(undefined, false, { errors: "Email or password is invalid." });
    }

    return done(undefined, user);
  }).catch(done);
}));
