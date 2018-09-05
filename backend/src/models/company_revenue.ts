import mongoose from "mongoose";

export type CompanyRevenueModel = mongoose.Document & {
    revenue: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
};

const CompanyRevenueSchema = new mongoose.Schema({
    revenue: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const CompanyRevenue: mongoose.Model<CompanyRevenueModel> = mongoose.model<CompanyRevenueModel>("CompanyRevenue", CompanyRevenueSchema, "company_revenues");
export default CompanyRevenue;
