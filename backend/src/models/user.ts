import crypto from "crypto";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { secret } from "../config";

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  bio: String,
  image: String,
  hash: String,
  salt: String
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = (password: string) => {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = (password: string) => {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UserSchema.methods.generateJWT = () => {
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: exp.getTime() / 1000
  }, secret);
};

UserSchema.methods.toAuthJSON = () => {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = () => {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "https://static.productionready.io/images/smiley-cyrus.jpg"
  };
};

const User = mongoose.model("User", UserSchema);
export default User;
