import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Log, LogModel } from "../../models/log";
import auth from "../auth";


const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Log.find({})
        .then((logs: LogModel[]) => {
            console.log(logs);
            if (!logs) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized access",
                });
            }

            return res.json({
                success: true,
                logs: logs,
            });
        }).catch(next);
});

export default router;
