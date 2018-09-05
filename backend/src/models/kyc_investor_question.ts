import mongoose from "mongoose";

export type KycInvestorQuestionModel = mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId,
    question1: string,
    question2: string,
    question3: string,
    question4: string,
    question5: string,
    question6: string,
    question7: string,
    question8: string,
    question9: string,
    question10: string,
    question11: string,
    question12: string,
    question13: string,
    question14: string,
    createdAt: Date,
    updatedAt: Date,
};

const KycInvestorQuestionSchema = new mongoose.Schema({
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

const KycInvestorQuestion: mongoose.Model<KycInvestorQuestionModel> = mongoose.model<KycInvestorQuestionModel>("KycInvestorQuestion", KycInvestorQuestionSchema, "kyc_investor_questions");
export default KycInvestorQuestion;
