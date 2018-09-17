import mongoose from "mongoose";

export type FrequentlyAskQuestionModel = mongoose.Document & {
    question: string,
    answer: string,
    status: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
};

const FrequentlyAskQuestionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    status: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const FrequentlyAskQuestion: mongoose.Model<FrequentlyAskQuestionModel> = mongoose.model<FrequentlyAskQuestionModel>("FrequentlyAskQuestion", FrequentlyAskQuestionSchema, "frequently_ask_questions");
export default FrequentlyAskQuestion;
