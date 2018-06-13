import crypto from "crypto";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import { secret } from "../config";

export type PowerUserModel = mongoose.Document & {
  username: string,
  email: string,
  hash: string
};

const PowerUserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
  hash: String,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const PowerUser: mongoose.Model<PowerUserModel> = mongoose.model<PowerUserModel>("PowerUser", PowerUserSchema);
export default PowerUser;
