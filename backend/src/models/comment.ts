import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  message: String,
  createdBy: String,
  createdAt: Date
}, { timestamps: true });

CommentSchema.methods.toJSONFor = (user: any) => {
  return {
    id: this._id,
    user: this.user.toProfileJSONFor(user),
    message: this.message,
    createdBy: this.createdBy,
    createdAt: this.createdAt
  };
};

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
