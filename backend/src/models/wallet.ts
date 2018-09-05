import mongoose from "mongoose";

export type WalletModel = mongoose.Document & {
    company: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    balance: number,
    balanceSync: boolean,
    reference: string,
    ethStealthAddressRecv: string,
    btcStealthAddressRecv: string,
    xrpStealthAddressRecv: string,
    ethAddress: string,
    btcAddress: string,
    xrpAddress: string,
    remarks: String,
    createdAt: Date,
    updatedAt: Date
};

const WalletSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    balance: { type: Number, default: 0.0 },
    balanceSync: Boolean,
    reference: String,
    ethStealthAddressReceiver: String,
    btcStealthAddressReceiver: String,
    xrpStealthAddressReceiver: String,
    ethAddress: String,
    btcAddress: String,
    xrpAddress: String,
    remarks: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Wallet: mongoose.Model<WalletModel> = mongoose.model<WalletModel>("Wallet", WalletSchema, "wallets");
export default Wallet;
