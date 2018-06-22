import mongoose from "mongoose";

export type AddressModel = mongoose.Document & {
  user: mongoose.Schema.Types.ObjectId,
  company: mongoose.Schema.Types.ObjectId,
  address1: string,
  address2: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  country: mongoose.Schema.Types.ObjectId,
  active: boolean,
  ipAddress: string,
  approvedBy: string,
  updatedBy: string,
  createdAt: Date,
  updatedAt: Date
};

const AddressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  address1: String,
  address2: String,
  city: String,
  stateProvince: String,
  postalCode: String,
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
  active: String,
  ipAddress: String,
  approvedBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });

AddressSchema.methods.toJSONFor = function(user: any) {
  return {
    id: this._id,
    user: this.user.toProfileJSONFor(user),
    company: this.company,
    address1: this.address1,
    address2: this.address2,
    city: this.city,
    stateProvince: this.stateProvince,
    postalCode: this.postalCode,
    country: this.country,
    active: this.active,
    ipAddress: this.ipAddress,
    approvedBy: this.approvedBy,
    updatedBy: this.updatedBy
  };
};

const Address = mongoose.model("Address", AddressSchema);
export default Address;
