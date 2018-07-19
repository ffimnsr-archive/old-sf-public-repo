import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as Log } from "../../models/log";
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
    // I think this is still a TODO for the address
    // Will just add Logging here so it can be used for later

    logAction(`User ${req.payload.username} updated wallet address`);
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
