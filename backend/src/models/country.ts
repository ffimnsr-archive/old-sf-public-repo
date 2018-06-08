import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
  name: String
});

const Country = mongoose.model("Country", CountrySchema);
export default Country;
