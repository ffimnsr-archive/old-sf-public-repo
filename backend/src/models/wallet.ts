import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  kycStatus: Number,
  ipAddress: String,
  expDate: Date,
  comments: String,
  approvedBy: String
}, { timestamps: true });

