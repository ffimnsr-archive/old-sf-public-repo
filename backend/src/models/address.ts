import mongoose from "mongoose";

export type AddressModel = mongoose.Document & {
  user: mongoose.Schema.Types.ObjectId,
  company: mongoose.Schema.Types.ObjectId,
  address1: string,
  address2: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  country: string,
  active: boolean,
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
  country: String,
  active: Boolean,
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
  };
};

const Address = mongoose.model("Address", AddressSchema, "addresses");
export default Address;
