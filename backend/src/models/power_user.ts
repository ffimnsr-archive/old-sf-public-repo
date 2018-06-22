import crypto from "crypto";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import { secret } from "../config";

export type PowerUserModel = mongoose.Document & {
  username: string,
  email: string,
  hash: string,
  salt: string,
  createdAt: Date,
  updatedAt: Date
};

const PowerUserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  hash: String,
  salt: String,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

PowerUserSchema.plugin(uniqueValidator, { message: "is already taken." });

PowerUserSchema.methods.validPassword = function(password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

PowerUserSchema.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

PowerUserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email,
    exp: exp.getTime() / 1000,
  }, secret);
};

PowerUserSchema.methods.toAuthJSON = function() {
  const token = this.generateJWT();
  return {
    username: this.username,
    email: this.email,
  };
};

const PowerUser: mongoose.Model<PowerUserModel> = mongoose.model<PowerUserModel>("PowerUser", PowerUserSchema);
export default PowerUser;
