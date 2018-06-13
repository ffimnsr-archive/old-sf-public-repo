import mongoose from "mongoose";

export type KycStatusModel = mongoose.Document & {
  registrationNo: string,
  address: number,
  kycStatus: number
};

const KycStatusSchema = new mongoose.Schema({
  status: Number,
  ipAddress: String,
  expirationDate: Date,
  comments: String,
  approvedBy: String,
  updatedBy: String
}, { timestamps: true });

const KycStatus: mongoose.Model<KycStatusModel> = mongoose.model<KycStatusModel>("KycStatus", KycStatusSchema);
export default KycStatus;
