import mongoose from "mongoose";

export type InquiryModel = mongoose.Document & {
    toDo: string
    account: string,
    name: string,
    email: string,
    description: string,
    followUpBy: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
};

const InquirySchema = new mongoose.Schema({
    toDo: String,
    account: String,
    name: String,
    email: String,
    description: String,
    followUpBy: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Inquiry: mongoose.Model<InquiryModel> = mongoose.model<InquiryModel>("Inquiry", InquirySchema, "inquiries");
export default Inquiry;
