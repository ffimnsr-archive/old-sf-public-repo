import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as KycDocumentType, KycDocumentTypeModel } from "../../models/kyc_document_type";
import auth from "../auth";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    KycDocumentType.find({}).then((t: KycDocumentTypeModel[]) => {
        return res.json({
            success: true,
            kycDocumentTypes: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new KycDocumentType();

    console.log(d);
    d.save().then((t: KycDocumentTypeModel) => {
        return res.json({
            success: true,
            kycDocumentType: t,
        });
    }).catch(next);
});


export default router;
