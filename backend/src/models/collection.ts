import mongoose from "mongoose";

export type CollectionModel = mongoose.Document & {
    bid: mongoose.Schema.Types.ObjectId,
    outstandingPrincipal: string,
    monthlyRepayment: string,
    principalPortion: string,
    interestPortion: string,
    platformContribution: string,
    outstandingPrincipalAfter: string,
    releaseStatus: string,
    releaseAmount: string,
    releaseReference: string,
    releaseBy: string,
    releaseDate: string,
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
    outstandingPrincipal: String,
    monthlyRepayment: String,
    principalPortion: String,
    interestPortion: String,
    platformContribution: String,
    outstandingPrincipalAfter: String,
    releaseStatus: String,
    releaseAmount: String,
    releaseReference: String,
    releaseBy: String,
    releaseDate: String,
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
