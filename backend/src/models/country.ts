import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
});

const Country = mongoose.model("Country", countrySchema);
export default Country;
