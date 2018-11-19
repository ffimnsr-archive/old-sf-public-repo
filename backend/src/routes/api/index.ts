import AWS from "aws-sdk";
import { NextFunction, Request, Response, Router } from "express";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import request from "request";
import uuidv4 from "uuid/v4";
import winston from "winston";
import multer from "multer";
import address from "./address";
import comment from "./comment";
import company from "./company";
import companyRevenue from "./company_revenue";
import country from "./country";
import creditRate from "./credit_rate";
import debtor from "./debtor";
import frequentlyAskQuestion from "./frequently_ask_question";
import loanPurpose from "./loan_purpose";
import inquiry from "./inquiry";
import loan from "./loan";
import investorPortfolio from "./investor_portfolio";
import kycDocument from "./kyc_document";
import kycDocumentType from "./kyc_document_type";
import kycInvestorQuestion from "./kyc_investor_question";
import kycStatus from "./kyc_status";
import log from "./log";
import session from "./session";
import user from "./user";
import wallet from "./wallet";

const router = Router();
const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        let id = crypto.randomBytes(16).toString("hex");
        let directory = `uploads/${id}`;

        try {
            fs.existsSync(directory) || fs.mkdirSync(directory);
        }
        catch (err) { }

        cb(null, directory);
    },
    filename: function(_req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(_req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            cb(new Error("Only image files are allowed!"), false);
            return;
        }

        cb(null, true);
    }
});

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

router.post("/uploader", upload.array("documents"), (req: Request, res: Response, next: NextFunction) => {
    let files = (<any>req.files).file;
    if (Array.isArray(files)) {
        console.log(`Got ${files.length} files`);
    } else {
        console.log(`Got one file`);
    }

    res.sendStatus(200);
});

router.get("/exchange-prices", (req: Request, res: Response, next: NextFunction) => {
    request.get("https://api.quoine.com/products")
        .on("error", function(err: string) {
            winston.error(err);
        }).pipe(res);
});

router.use("/address", address);
router.use("/comment", comment);
router.use("/company", company);
router.use("/company-revenue", companyRevenue);
router.use("/country", country);
router.use("/credit-rate", creditRate);
router.use("/debtor", debtor);
router.use("/frequently-ask-question", frequentlyAskQuestion);
router.use("/loan-purpose", loanPurpose);
router.use("/inquiry", inquiry);
router.use("/loan", loan);
router.use("/investor-portfolio", investorPortfolio);
router.use("/kyc-document-type", kycDocumentType);
router.use("/kyc-investor-question", kycInvestorQuestion);
router.use("/kyc-document", kycDocument);
router.use("/kyc-status", kycStatus);
router.use("/log", log);
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
