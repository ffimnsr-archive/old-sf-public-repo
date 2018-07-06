import mongoose from "mongoose";

export type KycDocumentTypeModel = mongoose.Document & {
  description: string,
  createdAt: Date,
  updatedAt: Date,
};

const KycDocumentTypeSchema = new mongoose.Schema({
  description: String,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const KycDocumentType: mongoose.Model<KycDocumentTypeModel> = mongoose.model<KycDocumentTypeModel>("KycDocumentType", KycDocumentTypeSchema, "kyc_document_types");
export default KycDocumentType;
