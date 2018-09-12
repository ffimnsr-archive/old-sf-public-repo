import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as Bid, BidModel } from "../../models/bid";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Bid.find({}).then((t: BidModel[]) => {
        return res.json({
            success: true,
            bids: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new Bid();

    d.status = req.body.user.status;
    d.save().then((t: BidModel) => {
        return res.json({
            success: true,
            bid: t,
        });
    }).catch(next);
});

export default router;
