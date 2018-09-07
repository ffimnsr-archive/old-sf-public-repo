import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as LoanPurpose, LoanPurposeModel } from "../../models/loan_purpose";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    LoanPurpose.find({}).then((t: LoanPurposeModel[]) => {
        return res.json({
            success: true,
            loanPurposes: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new LoanPurpose();

    d.name = req.body.user.name;
    d.status = req.body.user.status;

    d.save().then((t: LoanPurposeModel) => {
        return res.json({
            success: true,
            loanPurposes: t,
        });
    }).catch(next);
});

export default router;
