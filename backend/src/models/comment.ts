import mongoose from "mongoose";

export type CommentModel = mongoose.Document & {
    user: string,
    company: string,
    message: string,
    createdBy: string,
    createdAt: Date,
};

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    message: String,
    createdBy: String,
    createdAt: Date,
}, { timestamps: true });

CommentSchema.methods.toJSONFor = function(user: any) {
    return {
        id: this._id,
        user: this.user.toProfileJSONFor(user),
        message: this.message,
        createdBy: this.createdBy,
        createdAt: this.createdAt
    };
};

const Comment: mongoose.Model<CommentModel> = mongoose.model<CommentModel>("Comment", CommentSchema, "comments");
export default Comment;
