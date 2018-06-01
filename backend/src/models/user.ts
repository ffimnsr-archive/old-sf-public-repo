import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { NextFunction } from "express";

type comparePasswordFunction = (candidatePassword: string,
  cb: (err: mongoose.Error, isMatch: boolean) => {}) => void;

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  kycStatus: Number
}, { timestamps: true });

userSchema.pre("save", function(next: NextFunction) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }

      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
export default User;
