import mongoose from "mongoose";

const KycDocumentTypeSchema = new mongoose.Schema({
  description: String,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const KycDocumentType = mongoose.model("DocumentType", KycDocumentTypeSchema);
export default KycDocumentType;
