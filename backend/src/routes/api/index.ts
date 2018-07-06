import uuidv4 from "uuid/v4";
import AWS from "aws-sdk";
import { Router, Request, Response, NextFunction } from "express";

import { default as address } from "./address";
import { default as comment } from "./comment";
import { default as company } from "./company";
import { default as country } from "./country";
import { default as kycDocumentType } from "./kyc_document_type";
import { default as kycDocument } from "./kyc_document";
import { default as kycStatus } from "./kyc_status";
import { default as session } from "./session";
import { default as user } from "./user";
import { default as wallet } from "./wallet";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    success: true,
    message: "SmartFunding Ptd."
  });
});

router.get("/uploader", (req: Request, res: Response, next: NextFunction) => {
  const prefix = "KYC_";
  const newFileName = prefix + uuidv4();

  const bucketName = "bucket.smartfunding.io";

  AWS.config.loadFromPath("config.json");
  AWS.config.update({ region: "ap-southeast-1" });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
  });
  const s3Params = {
    Bucket: bucketName,
    Key: newFileName,
    Expires: 1200,
    ContentType: req.query.fileType,
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, function(err: Error, url: string) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "error happened while getting signed url",
      });
    } else {
      const returnData = {
        signedRequest: url,
        uploadURL: `http://${bucketName}.s3.amazonaws.com/${newFileName}`,
        downloadURL: `https://${bucketName}.s3-website-ap-southeast-1.amazonaws.com/${newFileName}`,
      };

      res.json(returnData);
    }
  });
});

router.use("/address", address);
router.use("/comment", comment);
router.use("/company", company);
router.use("/country", country);
router.use("/kyc-document-type", kycDocumentType);
router.use("/kyc-document", kycDocument);
router.use("/kyc-status", kycStatus);
router.use("/session", session);
router.use("/user", user);
router.use("/wallet", wallet);

// Shorten validation error on passport
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      success: false,
      errors: Object.keys(err.errors).reduce((errors: any, key: string) => {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

export default router;
