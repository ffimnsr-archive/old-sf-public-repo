import mongoose from "mongoose";

export type FrequentlyAskQuestionModel = mongoose.Document & {
    question: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date,
};

const FrequentlyAskQuestionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const FrequentlyAskQuestion: mongoose.Model<FrequentlyAskQuestionModel> = mongoose.model<FrequentlyAskQuestionModel>("FrequentlyAskQuestion", FrequentlyAskQuestionSchema, "frequently_ask_questions");
export default FrequentlyAskQuestion;
