import crypto from "crypto";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import { secret } from "../config";

export type UserModel = mongoose.Document & {
  username: string,
  email: string,
  bio: string,
  image: string,
  hash: string,
  salt: string,
  typeset: string,
  forename: string,
  surname: string,
  isMailVerified: boolean,
  isDocumentsSubmitted: boolean,
  kycStatus: mongoose.Schema.Types.ObjectId,
  address: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
  validPassword: (password: string) => string,
  setPassword: (password: string) => void,
  generateJWT: () => string,
  toAuthJSON: () => Map<string, any>,
  toProfileJSONFor: () => Map<string, any>
};

const UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  bio: String,
  image: String,
  hash: String,
  salt: String,
  forename: String,
  surname: String,
  typeset: String,
  isMailVerified: { type: Boolean, default: false },
  isDocumentsSubmitted: { type: Boolean, default: false },
  kycStatus: { type: mongoose.Schema.Types.ObjectId, ref: "KycStatus" },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = function(password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email,
    typeset: this.typeset,
    exp: exp.getTime() / 1000
  }, secret);
};

UserSchema.methods.toAuthJSON = function() {
  const token = this.generateJWT();
  return {
    username: this.username,
    email: this.email,
    token: token,
    bio: this.bio,
    image: this.image,
    typeset: this.typeset,
    isMailVerified: this.isMailVerified,
    isDocumentsSubmitted: this.isDocumentsSubmitted,
  };
};

UserSchema.methods.toProfileJSONFor = function() {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "/favicon.png"
  };
};

UserSchema.methods.fullName = function() {
  return (this.forename.trim() + " " + this.surname.trim());
};

const User: mongoose.Model<UserModel> = mongoose.model<UserModel>("User", UserSchema);
export default User;
