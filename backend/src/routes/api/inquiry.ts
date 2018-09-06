import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as Inquiry, InquiryModel } from "../../models/inquiry";
import CountryList from "country-list";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Inquiry.find({}).then((t: InquiryModel[]) => {
        return res.json({
            success: true,
            countries: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new Inquiry();

    d.status = req.body.user.status;
    d.save().then((t: InquiryModel) => {
        return res.json({
            success: true,
            user: t,
        });
    }).catch(next);
});

export default router;
