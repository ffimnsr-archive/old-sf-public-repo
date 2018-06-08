import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const Wallet = mongoose.model("Wallet", WalletSchema);
export default Wallet;
