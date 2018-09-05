import mongoose from "mongoose";

export type CountryModel = mongoose.Document & {
    code: string,
    name: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
};

const CountrySchema = new mongoose.Schema({
    code: String,
    name: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Country: mongoose.Model<CountryModel> = mongoose.model<CountryModel>("Country", CountrySchema, "countries");
export default Country;
