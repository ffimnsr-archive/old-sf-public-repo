import { Router, Request, Response, NextFunction } from "express";
import { default as api } from "./api";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

router.use("/api", api);

export default router;
