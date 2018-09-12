import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { default as KycDocument, KycDocumentModel } from "../../models/kyc_document";
import auth from "../auth";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        success: true,
        message: "SmartFunding"
    });
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    KycDocument.find({}).then((t: KycDocumentModel[]) => {
        return res.json({
            success: true,
            kycDocuments: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new KycDocument();

    console.log(d);
    d.save().then((t: KycDocumentModel) => {
        return res.json({
            success: true,
            kycDocument: t,
        });
    }).catch(next);
});


export default router;
