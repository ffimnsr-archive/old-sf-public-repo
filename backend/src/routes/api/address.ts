import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  // User.findById((<any>req).payload.id).then((user: UserModel) => {
  //   if (!user) {
  //     return res.status(401).json({
  //       success: false,
  //       message: "unauthorized access",
  //     });
  //   }

  //   return res.json({
  //     success: true,
  //     user: user.toAuthJSON()
  //   });
  // }).catch(next);

  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

router.put("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

export default router;
