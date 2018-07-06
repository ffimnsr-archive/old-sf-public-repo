import mongoose from "mongoose";

export type KycStatusLogModel = mongoose.Document & {
  message: string
  createdAt: Date,
};

const KycStatusLogSchema = new mongoose.Schema({
  message: String,
  createdAt: Date,
}, { timestamps: true });

const KycStatusLog: mongoose.Model<KycStatusLogModel> = mongoose.model<KycStatusLogModel>("KycStatusLog", KycStatusLogSchema, "kyc_status_logs");
export default KycStatusLog;
