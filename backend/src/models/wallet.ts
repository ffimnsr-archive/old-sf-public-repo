import mongoose from "mongoose";

export type WalletModel = mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId,
    balance: number,
    balanceSync: boolean,
    reference: string,
    ethStealthAddressRecv: string,
    ethAddress: string,
    btcStealthAddressRecv: string,
    btcAddress: string,
    xrpStealthAddressRecv: string,
    xrpAddress: string,
    bankName: string,
    bankAccountNo: string,
    bankAccountHolderName: string,
    remarks: String,
    createdAt: Date,
    updatedAt: Date
};

const WalletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    balance: { type: Number, default: 0.0 },
    balanceSync: Boolean,
    reference: String,
    ethStealthAddressReceiver: String,
    ethAddress: String,
    btcStealthAddressReceiver: String,
    btcAddress: String,
    xrpStealthAddressReceiver: String,
    xrpAddress: String,
    bankName: String,
    bankAccountNo: String,
    bankAccountHolderName: String,
    remarks: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const Wallet: mongoose.Model<WalletModel> = mongoose.model<WalletModel>("Wallet", WalletSchema, "wallets");
export default Wallet;
