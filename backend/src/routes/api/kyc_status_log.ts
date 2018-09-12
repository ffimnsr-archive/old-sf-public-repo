import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as KycStatusLog, KycStatusLogModel } from "../../models/kyc_status_log";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    KycStatusLog.find({}).then((t: KycStatusLogModel[]) => {
        return res.json({
            success: true,
            kycStatusLogs: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new KycStatusLog();

    d.save().then((t: KycStatusLogModel) => {
        return res.json({
            success: true,
            kycStatusLogs: t,
        });
    }).catch(next);
});

export default router;
