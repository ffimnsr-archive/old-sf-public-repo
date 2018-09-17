import mongoose from "mongoose";

export type KycStatusModel = mongoose.Document & {
    status: string,
    ipAddress: number,
    expirationDate: Date,
    comments: string,
    approvedBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId,
    remarks: string,
    kycInvestorQuestion: mongoose.Schema.Types.ObjectId,
    kycDocument: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
};

const KycStatusSchema = new mongoose.Schema({
    status: String,
    ipAddress: String,
    expirationDate: Date,
    comments: String,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    remarks: String,
    kycInvestorQuestion: { type: mongoose.Schema.Types.ObjectId, ref: "KycInvestorQuestion" },
    kycDocument: { type: mongoose.Schema.Types.ObjectId, ref: "KycDocument" },
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const KycStatus: mongoose.Model<KycStatusModel> = mongoose.model<KycStatusModel>("KycStatus", KycStatusSchema, "kyc_status");
export default KycStatus;
