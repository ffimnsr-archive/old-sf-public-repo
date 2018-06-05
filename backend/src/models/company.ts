import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: Number,
  registrationNo: String,
  kycStatus: Number,
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;
