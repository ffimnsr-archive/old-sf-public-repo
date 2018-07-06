import mongoose from "mongoose";

export type LogModel = mongoose.Document & {
  message: string
  createdAt: Date,
};

const LogSchema = new mongoose.Schema({
  message: String,
  createdAt: Date,
}, { timestamps: true });

const Log: mongoose.Model<LogModel> = mongoose.model<LogModel>("Log", LogSchema, "logs");
export default Log;
