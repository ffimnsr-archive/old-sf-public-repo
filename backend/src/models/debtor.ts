import mongoose from "mongoose";

export type DebtorModel = mongoose.Document & {
    name: string,
    industry: mongoose.Schema.Types.ObjectId,
    status: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean
};

const DebtorSchema = new mongoose.Schema({
    name: String,
    industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry" },
    status: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
    updatedAt: Date,
    isDeleted: Boolean
}, { timestamps: true });

const Debtor: mongoose.Model<DebtorModel> = mongoose.model<DebtorModel>("Debtor", DebtorSchema, "debtors");
export default Debtor;
