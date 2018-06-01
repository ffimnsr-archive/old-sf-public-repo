import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  address1: String,
  address2: String,
  city: String,
  stateProvince: String,
  postalCode: String,
  countryId: Number,
  active: String,
  ipAddress: String,
  approvedBy: String
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);
export default Address;
