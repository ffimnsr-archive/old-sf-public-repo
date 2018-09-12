import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Log } from "../../models/log";
import { default as Wallet, WalletModel } from "../../models/wallet";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    logAction(`User ${req.payload.username} requested balance`);
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Wallet.find({}).then((t: WalletModel[]) => {
        return res.json({
            success: true,
            wallets: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new Wallet();

    console.log(d);
    d.save().then((t: WalletModel) => {
        return res.json({
            success: true,
            wallet: t,
        });
    }).catch(next);
});


function logAction(message: string) {
    const log = new Log();
    log.message = message;
    return log.save();
}

export default router;
