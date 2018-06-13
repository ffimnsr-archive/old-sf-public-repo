import { Router, Request, Response, NextFunction } from "express";

import { default as address } from "./address";
import { default as comment } from "./comment";
import { default as company } from "./company";
import { default as country } from "./country";
import { default as kycDocumentType } from "./kyc_document_type";
import { default as kycDocument } from "./kyc_document";
import { default as kycStatus } from "./kyc_status";
import { default as powerUser } from "./power_user";
import { default as user } from "./user";
import { default as wallet } from "./wallet";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

router.use("/address", address);
router.use("/comment", comment);
router.use("/company", company);
router.use("/country", country);
router.use("/kyc-document-type", kycDocumentType);
router.use("/kyc-document", kycDocument);
router.use("/kyc-status", kycStatus);
router.use("/power-user", powerUser);
router.use("/user", user);
router.use("/wallet", wallet);

export default router;
