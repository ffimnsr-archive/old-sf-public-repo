import mongoose from "mongoose";

export type CountryModel = mongoose.Document & {
  name: string
  createdAt: Date,
  updatedAt: Date,
};

const CountrySchema = new mongoose.Schema({
  name: String,
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });



const Country: mongoose.Model<CountryModel> = mongoose.model<CountryModel>("Country", CountrySchema);
export default Country;
