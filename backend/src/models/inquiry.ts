import mongoose from "mongoose";

export type InquiryModel = mongoose.Document & {
    rate: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
};

const InquirySchema = new mongoose.Schema({
    rate: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Inquiry: mongoose.Model<InquiryModel> = mongoose.model<InquiryModel>("Inquiry", InquirySchema, "inquiries");
export default Inquiry;
