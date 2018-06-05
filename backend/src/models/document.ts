import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  kycStatus: Number,
  ipAddress: String,
  expDate: Date,
  comments: String,
  approvedBy: String
}, { timestamps: true });

const Kyc = mongoose.model("Kyc", kycSchema);
export default Kyc;
