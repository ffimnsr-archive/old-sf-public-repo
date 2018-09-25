import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Loan, LoanModel } from "../../models/loan";
import auth from "../auth";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Loan.find({}).then((t: LoanModel[]) => {
        return res.json({
            success: true,
            data: t,
        });
    }).catch(next);
});

router.get("/get-user/:uid", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let uid = req.params.uid;
    Loan.findOne({ user: uid })
        .then((t: LoanModel) => {
            if (!t) {
                return res.status(200).json({
                    success: false,
                    message: "unauthorized access",
                });
            }
            return res.json({
                success: true,
                data: t,
            });
        }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new Loan();

    d.save().then((t: LoanModel) => {
        return res.json({
            success: true,
            data: t,
        });
    }).catch(next);
});

export default router;
