import mongoose from "mongoose";

export type CommentModel = mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId,
    company: mongoose.Schema.Types.ObjectId,
    message: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
};

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    message: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
}, { timestamps: true });

CommentSchema.methods.toJSONFor = function(user: any) {
    return {
        id: this._id,
        user: this.user.toProfileJSONFor(),
        message: this.message,
        createdBy: this.createdBy,
        createdAt: this.createdAt
    };
};

const Comment: mongoose.Model<CommentModel> = mongoose.model<CommentModel>("Comment", CommentSchema, "comments");
export default Comment;
