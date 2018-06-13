import mongoose from "mongoose";

export type KycDocumentTypeModel = mongoose.Document & {
  description: string
};

const KycDocumentTypeSchema = new mongoose.Schema({
  description: String,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const KycDocumentType: mongoose.Model<KycDocumentTypeModel> = mongoose.model<KycDocumentTypeModel>("DocumentType", KycDocumentTypeSchema);
export default KycDocumentType;
