import mongoose from "mongoose";

export type KycDocumentModel = mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question6: String,
    question7: String,
    question8: String,
    question9: String,
    question10: String,
    question11: String,
    question12: String,
    question13: String,
    question14: String,
    createdAt: Date,
    updatedAt: Date,
};

const KycDocumentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question6: String,
    question7: String,
    question8: String,
    question9: String,
    question10: String,
    question11: String,
    question12: String,
    question13: String,
    question14: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const KycDocument: mongoose.Model<KycDocumentModel> = mongoose.model<KycDocumentModel>("KycDocument", KycDocumentSchema, "kyc_documents");
export default KycDocument;
