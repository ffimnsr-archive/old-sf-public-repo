import mongoose from "mongoose";

const KycStatusSchema = new mongoose.Schema({
  status: Number,
  ipAddress: String,
  expirationDate: Date,
  comments: String,
  approvedBy: String,
  updatedBy: String
}, { timestamps: true });

const KycStatus = mongoose.model("KycStatus", KycStatusSchema);
export default KycStatus;
