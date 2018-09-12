import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as Inquiry, InquiryModel } from "../../models/inquiry";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Inquiry.find({}).then((t: InquiryModel[]) => {
        return res.json({
            success: true,
            inquries: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new Inquiry();

    d.status = req.body.user.status;
    d.save().then((t: InquiryModel) => {
        return res.json({
            success: true,
            inquiry: t,
        });
    }).catch(next);
});

export default router;
