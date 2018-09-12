import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as KycInvestorQuestion, KycInvestorQuestionModel } from "../../models/kyc_investor_question";
import auth from "../auth";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    KycInvestorQuestion.find({}).then((t: KycInvestorQuestionModel[]) => {
        return res.json({
            success: true,
            kycInvestorQuestions: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new KycInvestorQuestion();

    console.log(d);
    d.save().then((t: KycInvestorQuestionModel) => {
        return res.json({
            success: true,
            kycInvestorQuestions: t,
        });
    }).catch(next);
});

export default router;
