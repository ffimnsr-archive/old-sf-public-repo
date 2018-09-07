import mongoose from "mongoose";

export type KycInvestorQuestionModel = mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId,
    questionBool: [number],
    questionString: [string],
    createdAt: Date,
    updatedAt: Date,
};

const KycInvestorQuestionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questionBool: [Number],
    questionString: [String],
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const KycInvestorQuestion: mongoose.Model<KycInvestorQuestionModel> = mongoose.model<KycInvestorQuestionModel>("KycInvestorQuestion", KycInvestorQuestionSchema, "kyc_investor_questions");
export default KycInvestorQuestion;
