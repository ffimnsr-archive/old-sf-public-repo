import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as KycStatus, KycStatusModel } from "../../models/kyc_status";
import auth from "../auth";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    KycStatus.find({}).then((t: KycStatusModel[]) => {
        return res.json({
            success: true,
            countries: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const kyc = new KycStatus();

    kyc.status = req.body.user.status;

    console.log(kyc);
    kyc.save().then((t: KycStatusModel) => {
        return res.json({
            success: true,
            user: t,
        });
    }).catch(next);
});

export default router;
