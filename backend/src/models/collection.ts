import mongoose from "mongoose";

export type CollectionModel = mongoose.Document & {
    bid: mongoose.Schema.Types.ObjectId,
    outstandingPrincipal: number,
    monthlyRepayment: number,
    principalPortion: number,
    interestPortion: number,
    platformContribution: number,
    outstandingPrincipalAfter: number,
    releaseStatus: string,
    releaseAmount: number,
    releaseReference: string,
    releaseBy: string,
    releaseDate: Date,
    isDeleted: string,
    dealPortion: string,
    repaid: string,
    released: string,
    createdBy: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date,
};

const CollectionSchema = new mongoose.Schema({
    bid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
    outstandingPrincipal: Number,
    monthlyRepayment: Number,
    principalPortion: Number,
    interestPortion: Number,
    platformContribution: Number,
    outstandingPrincipalAfter: Number,
    releaseStatus: String,
    releaseAmount: Number,
    releaseReference: String,
    releaseBy: String,
    releaseDate: Date,
    isDeleted: String,
    dealPortion: String,
    repaid: String,
    released: String,
    createdBy: String,
    updatedBy: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Collection: mongoose.Model<CollectionModel> = mongoose.model<CollectionModel>("Collection", CollectionSchema, "collections");
export default Collection;
