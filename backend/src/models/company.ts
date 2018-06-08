import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  registrationNo: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  kycStatus: { type: mongoose.Schema.Types.ObjectId, ref: "KycStatus" }
}, { timestamps: true });

const Company = mongoose.model("Company", CompanySchema);
export default Company;
