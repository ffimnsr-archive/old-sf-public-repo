import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  kycStatus: Number,
  ipAddress: String,
  expDate: Date,
  comments: String,
  approvedBy: String
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
