import mongoose from "mongoose";

export type IndustryModel = mongoose.Document & {
    category: string,
    name: string,
    status: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
};

const IndustrySchema = new mongoose.Schema({
    category: String,
    name: String,
    status: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Industry: mongoose.Model<IndustryModel> = mongoose.model<IndustryModel>("Industry", IndustrySchema, "industries");
export default Industry;
