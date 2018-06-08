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
  forename: string,
  surname: string,
  kycStatus: any,
  address: any
  validPassword: (password: string) => string,
  setPassword: (password: string) => void,
  generateJWT: () => string,
  toAuthJSON: () => Map<string, string>,
  toProfileJSONFor: () => Map<string, string>
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
  kycStatus: { type: mongoose.Schema.Types.ObjectId, ref: "KycStatus" },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = (password: string) => {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = (password: string) => {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UserSchema.methods.generateJWT = () => {
  const today = new Date();
  const exp = new Date(today);
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
    image: this.image || "/favicon.png"
  };
};

const User = mongoose.model("User", UserSchema);
export default User;
