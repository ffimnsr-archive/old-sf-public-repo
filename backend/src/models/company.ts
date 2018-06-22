import mongoose from "mongoose";

export type CompanyModel = mongoose.Document & {
  registrationNo: string,
  address: mongoose.Schema.Types.ObjectId,
  kycStatus: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
};

const CompanySchema = new mongoose.Schema({
  registrationNo: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  kycStatus: { type: mongoose.Schema.Types.ObjectId, ref: "KycStatus" },
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });

const Company: mongoose.Model<CompanyModel> = mongoose.model<CompanyModel>("Company", CompanySchema);
export default Company;
