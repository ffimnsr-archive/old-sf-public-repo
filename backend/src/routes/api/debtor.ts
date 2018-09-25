import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as Debtor, DebtorModel } from "../../models/debtor";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Debtor.find({}).then((t: DebtorModel[]) => {
        return res.json({
            success: true,
            data: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new Debtor();

    d.name = req.body.user.name;
    d.status = req.body.user.status;

    d.save().then((t: DebtorModel) => {
        return res.json({
            success: true,
            data: t,
        });
    }).catch(next);
});

export default router;
