import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Log } from "../../models/log";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    logAction(`User ${req.payload.username} requested balance`);
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
