import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Comment, CommentModel } from "../../models/comment";
import { default as Log } from "../../models/log";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Comment.find().then((comments: Array<CommentModel>) => {
        return res.json({
            success: true,
            comments: comments
        });
    }).catch(next);
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Comment.find({}).then((t: CommentModel[]) => {
        return res.json({
            success: true,
            countries: t,
        });
    }).catch(next);
});

router.put("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let comment = new Comment();

    comment.save().then((persistedComment: CommentModel) => {
        logAction(`User ${req.payload.username} has placed a comment`);
        return res.json({
            success: true,
            message: "Comment sent successfully"
        });
    }).catch(next);
});

function logAction(message: string) {
    const log = new Log();
    log.message = message;
    return log.save();
}

export default router;
