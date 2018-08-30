import mongoose from "mongoose";

export type WalletLogModel = mongoose.Document & {
    message: string
    createdAt: Date,
};

const WalletLogSchema = new mongoose.Schema({
    message: String,
    createdAt: Date,
}, { timestamps: true });

const WalletLog: mongoose.Model<WalletLogModel> = mongoose.model<WalletLogModel>("WalletLog", WalletLogSchema, "wallet_logs");
export default WalletLog;
