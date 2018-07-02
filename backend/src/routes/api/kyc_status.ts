import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

export default router;
