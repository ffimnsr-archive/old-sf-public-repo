import mongoose from "mongoose";

export type WalletModel = mongoose.Document & {
  company: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date
};

const WalletSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const Wallet: mongoose.Model<WalletModel> = mongoose.model<WalletModel>("Wallet", WalletSchema);
export default Wallet;
