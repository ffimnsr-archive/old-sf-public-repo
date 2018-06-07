import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";

import { default as User } from "../models/user";

passport.use(new LocalStrategy({
  usernameField: "user[email]",
  passwordField: "user[password]"
}, (email: string, password: string, done: any) => {
  User.findOne({ email: email }).then((user: any) => {
    if (!user || !user.validPassword(password)) {
      return done(null, false, { errors: { "email or password": "is invalid" } });
    }

    return done(null, user);
  }).catch(done);
}));
