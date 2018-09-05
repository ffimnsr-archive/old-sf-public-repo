import mongoose from "mongoose";

export type LoanPurposeModel = mongoose.Document & {
    name: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
};

const LoanPurposeSchema = new mongoose.Schema({
    name: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const LoanPurpose: mongoose.Model<LoanPurposeModel> = mongoose.model<LoanPurposeModel>("LoanPurpose", LoanPurposeSchema, "loan_purposes");
export default LoanPurpose;
