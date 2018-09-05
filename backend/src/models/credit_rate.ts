import mongoose from "mongoose";

export type CreditRateModel = mongoose.Document & {
    rate: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
};

const CreditRateSchema = new mongoose.Schema({
    rate: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const CreditRate: mongoose.Model<CreditRateModel> = mongoose.model<CreditRateModel>("CreditRate", CreditRateSchema, "credit_rates");
export default CreditRate;
