import mongoose from "mongoose";

export type LogModel = mongoose.Document & {
    menu: string,
    action: string,
    record: string,
    user: string,
    message: string
    createdAt: Date,
};

const LogSchema = new mongoose.Schema({
    menu: String,
    action: String,
    record: String,
    user: String,
    message: String,
    createdAt: Date,
}, { timestamps: true });

const Log: mongoose.Model<LogModel> = mongoose.model<LogModel>("Log", LogSchema, "logs");
export default Log;
