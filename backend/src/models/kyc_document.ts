import mongoose from "mongoose";

export type KycDocumentModel = mongoose.Document & {
  registrationNo: string,
  address: number,
  kycStatus: number
};

const KycDocumentSchema = new mongoose.Schema({
  kycDocumentType: { type: mongoose.Schema.Types.ObjectId, ref: "KycDocumentType" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  documentNo: Number,
  description: String,
  expirationDate: Date,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const KycDocument: mongoose.Model<KycDocument> = mongoose.model<KycDocument>("Document", KycDocumentSchema);
export default KycDocument;
