import mongoose from "mongoose";

export type AddressModel = mongoose.Document & {
  user: number,
  company: number,
  address1: string,
  address2: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  country: number,
  active: boolean,
  ipAddress: string,
  approvedBy: string,
  updatedBy: string
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
  updatedAt: Date
}, { timestamps: true });

AddressSchema.methods.toJSONFor = function(user: any) {
  return {
    id: this._id,
    user: this.user.toProfileJSONFor(user),
    address1: this.address1,
    address2: this.address2,
    createdAt: this.createdAt
  };
};

const Address = mongoose.model("Address", AddressSchema);
export default Address;
