import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as CampaignLead, CampaignLeadModel } from "../../models/campaign_lead";
import { default as Log } from "../../models/log";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    CampaignLead.findById(req.payload.id)
        .then((data: CampaignLeadModel) => {
            if (!data) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized access",
                });
            }
            return res.json({
                success: true,
                data: data
            });
        }).catch(next);
});

router.post("/add", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new CampaignLead();

    d.utmSource = req.body.data.utmSource;
    d.utmMedium = req.body.data.utmMedium;
    d.utmCampaign = req.body.data.utmCampaign;
    d.utmTerm = req.body.data.utmTerm;
    d.utmContent = req.body.data.utmContent;
    d.email = req.body.data.email;

    d.save().then((t: CampaignLeadModel) => {
        return res.json({
            success: true,
            data: t,
        });
    }).catch(next);
});

function logAction(message: string) {
    const log = new Log();
    log.message = message;
    return log.save();
}

export default router;
