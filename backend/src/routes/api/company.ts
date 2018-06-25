import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  // TODO: must get the current user associated company
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

router.put("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  // TODO: must modify own company
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

export default router;
