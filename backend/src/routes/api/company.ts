import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Company, CompanyModel } from "../../models/company";
import { default as Log } from "../../models/log";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

router.get("/get-user/:uid", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let uid = req.params.uid;
    Company.findOne({ user: uid })
        .then((user: CompanyModel) => {
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


router.put("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    logAction(`User ${req.payload.username} has modified company`);
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

function logAction(message: string) {
    const log = new Log();
    log.message = message;
    return log.save();
}

export default router;
