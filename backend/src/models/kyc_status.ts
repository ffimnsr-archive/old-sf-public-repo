import mongoose from "mongoose";

export type KycStatusModel = mongoose.Document & {
  status: string,
  ipAddress: number,
  expirationDate: Date,
  comments: string,
  approvedBy: string,
  updatedBy: string,
  createdAt: Date,
  updatedAt: Date,
};

const KycStatusSchema = new mongoose.Schema({
  status: String,
  ipAddress: String,
  expirationDate: Date,
  comments: String,
  approvedBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });

const KycStatus: mongoose.Model<KycStatusModel> = mongoose.model<KycStatusModel>("KycStatus", KycStatusSchema);
export default KycStatus;
