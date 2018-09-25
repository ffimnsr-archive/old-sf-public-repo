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

router.get("/get-user/:uid", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let uid = req.params.uid;
    console.log("sample", uid);
    KycInvestorQuestion.findOne({ user: uid })
        .then((user: KycInvestorQuestionModel) => {
            console.log(user);
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: "unauthorized access",
                });
            }
            return res.json({
                success: true,
                user: user,
            });
        }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new KycInvestorQuestion();

    d.save().then((t: KycInvestorQuestionModel) => {
        return res.json({
            success: true,
            kycInvestorQuestions: t,
        });
    }).catch(next);
});

export default router;
