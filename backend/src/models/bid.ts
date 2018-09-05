import mongoose from "mongoose";

export type LoanStatusModel = mongoose.Document & {
    name: string
    createdAt: Date,
    updatedAt: Date,
};

const LoanStatusSchema = new mongoose.Schema({
    name: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const LoanStatus: mongoose.Model<LoanStatusModel> = mongoose.model<LoanStatusModel>("LoanStatus", LoanStatusSchema, "loan_statuses");
export default LoanStatus;
