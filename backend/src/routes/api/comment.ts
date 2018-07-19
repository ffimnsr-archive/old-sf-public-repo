import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Log } from "../../models/log";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

router.put("/", auth.required, (req: Request, res: Response, next: NextFunction) => {

    logAction(`User ${req.payload.username} has placed a comment`);
    return res.json({
      success: true,
      message: "SmartFunding"
    });
});

function logAction(message: string) {
    let log = new Log();
    log.message = message;
    return log.save();
}

export default router;
