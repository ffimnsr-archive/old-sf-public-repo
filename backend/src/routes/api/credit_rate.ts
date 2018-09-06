import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as CreditRate, CreditRateModel } from "../../models/credit_rate";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    CreditRate.find({}).then((t: CreditRateModel[]) => {
        return res.json({
            success: true,
            creditRates: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const rate = new CreditRate();

    rate.rate = req.body.user.rate;
    rate.status = req.body.user.status;

    console.log(rate);
    rate.save().then((t: CreditRateModel) => {
        return res.json({
            success: true,
            creditRate: t,
        });
    }).catch(next);
});

export default router;
