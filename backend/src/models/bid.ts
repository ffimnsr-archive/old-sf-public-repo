import mongoose from "mongoose";

export type BidModel = mongoose.Document & {
    code: string,
    loan: string,
    user: mongoose.Schema.Types.ObjectId,
    amount: string,
    status: string,
    remarks: string,
    confirmBy: string,
    confirmDate: string,
    createdAt: Date,
    updatedAt: Date,
};

const BidSchema = new mongoose.Schema({
    code: String,
    loan: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: String,
    status: String,
    remarks: String,
    confirmBy: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Bid: mongoose.Model<BidModel> = mongoose.model<BidModel>("Bid", BidSchema, "bids");
export default Bid;
