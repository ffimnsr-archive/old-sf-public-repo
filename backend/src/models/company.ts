import mongoose from "mongoose";

export type CompanyModel = mongoose.Document & {
  registrationNo: string,
  address: number,
  kycStatus: number
};

const CompanySchema = new mongoose.Schema({
  registrationNo: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  kycStatus: { type: mongoose.Schema.Types.ObjectId, ref: "KycStatus" }
}, { timestamps: true });

const Company: mongoose.Model<CompanyModel> = mongoose.model<CompanyModel>("Company", CompanySchema);
export default Company;
