import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as FrequentlyAskQuestion, FrequentlyAskQuestionModel } from "../../models/frequently_ask_questions";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    FrequentlyAskQuestion.find({}).then((t: FrequentlyAskQuestionModel[]) => {
        console.log(t);
        return res.json({
            success: true,
            faqs: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new FrequentlyAskQuestion();

    d.question = req.body.user.question;
    d.answer = req.body.user.answer;
    d.status = req.body.user.status;

    d.save().then((t: FrequentlyAskQuestionModel) => {
        return res.json({
            success: true,
            faq: t,
        });
    }).catch(next);
});

export default router;
