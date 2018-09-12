import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as WalletLog, WalletLogModel } from "../../models/wallet_log";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    WalletLog.find({}).then((t: WalletLogModel[]) => {
        return res.json({
            success: true,
            walletLogs: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new WalletLog();

    console.log(d);
    d.save().then((t: WalletLogModel) => {
        return res.json({
            success: true,
            walletLog: t,
        });
    }).catch(next);
});

export default router;
