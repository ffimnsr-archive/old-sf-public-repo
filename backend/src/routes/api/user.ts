import mongoose from "mongoose";
import speakeasy from "speakeasy";
import passport from "passport";
import ecc from "tiny-secp256k1";
import bitcoin from "bitcoinjs-lib";
import fs from "fs";
import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as User, UserModel } from "../../models/user";
import { default as Loan, LoanModel } from "../../models/loan";
import { default as Address, AddressModel } from "../../models/address";
import { default as Wallet, WalletModel } from "../../models/wallet";
import { default as KycInvestorQuestion, KycInvestorQuestionModel } from "../../models/kyc_investor_question";
import { default as Company, CompanyModel } from "../../models/company";
import { default as Log } from "../../models/log";
import { baseUri, walletWIF } from "../../config";

const router = Router();
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "/tmp/uploads/")
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.payload.id)
        .populate("wallet")
        .populate("address")
        .then((user: any) => {
            console.log(user);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized access",
                });
            }

            return res.json({
                success: true,
                user: user,
            });
        }).catch(next);
});

router.get("/get-user/:uid", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let uid = req.params.uid;
    User.findById(uid)
        .populate("wallet")
        .populate("address")
        .then((user: UserModel) => {
            console.log(user);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized access",
                });
            }
            return res.json({
                success: true,
                user: user.toAuthJSON(),
                wallet: user.wallet,
                address: user.address,
            });
        }).catch(next);
});

router.put("/change-status/:uid", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let uid = req.params.uid;
    User.findById(uid)
        .then((user: UserModel) => {
            user.status = req.body.user.status;
            user.remarks = req.body.user.remarks;

            console.log(user.status);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized access",
                });
            }

            user.save().then((t: UserModel) => {
                return res.status(200).json({
                    success: true,
                    user: t.toAuthJSON()
                });
            });

        }).catch(next);
});


router.put("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        if (typeof req.body.user.username !== "undefined") {
            user.username = req.body.user.username;
        }

        if (typeof req.body.user.email !== "undefined") {
            user.email = req.body.user.email;
        }

        if (typeof req.body.user.bio !== "undefined") {
            user.bio = req.body.user.bio;
        }

        if (typeof req.body.user.image !== "undefined") {
            user.image = req.body.user.image;
        }

        if (typeof req.body.user.password !== "undefined") {
            user.setPassword(req.body.user.password);
        }

        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} successfully updated account`);
            return res.status(200).json({
                success: true,
                user: t.toAuthJSON()
            });
        });
    }).catch(next);
});

router.put("/details", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {

        if (typeof req.body.user.forename !== "undefined") {
            user.forename = req.body.user.forename;
        }

        if (typeof req.body.user.surname !== "undefined") {
            user.surname = req.body.user.surname;
        }

        const address = new Address({
            user: user._id,
            address1: req.body.user.address1,
            address2: req.body.user.address2,
            city: req.body.user.city,
            stateProvince: req.body.user.stateProvince,
            postalCode: req.body.user.postalCode,
            country: req.body.user.country,
            active: false,
        });

        user.status = req.body.user.status;
        user.address = address._id;
        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} successfully updated account details`);
            address.save();

            return res.status(200).json({
                success: true,
                user: t.toAuthJSON()
            });
        });
    }).catch(next);
});

router.put("/crypto-wallet", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Wallet.findOneAndUpdate(
        { user: req.payload.id },
        { $set: { "ethAddress": req.body.user.ethAddress, "btcAddress": req.body.user.btcAddress } },
        { upsert: true }
    ).catch(next);
});

router.put("/image", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        if (typeof req.body.user.image !== "undefined") {
            user.image = req.body.user.image;
        }

        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} updated account image`);
            return res.status(200).json({
                success: true,
                user: t.toAuthJSON()
            });
        });
    }).catch(next);
});

router.put("/kyc-documents", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        if (typeof req.body.user.image !== "undefined") {
            user.image = req.body.user.image;
        }

        user.status = req.body.user.status;
        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} updated kyc documents`);
            return res.status(200).json({
                success: true,
                user: t.toAuthJSON()
            });
        });
    }).catch(next);
});

router.put("/set-status", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        user.status = req.body.user.status;
        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} updated account status`);
            return res.status(200).json({
                success: true,
                user: t.toAuthJSON()
            });
        });
    }).catch(next);
});

router.put("/type-i", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        let temp = req.body;

        if (typeof temp.user.typeset !== "undefined") {
            user.typeset = temp.user.typeset;
        }

        if (typeof temp.user.status !== "undefined") {
            user.status = temp.user.status;
        }

        let kiq = new KycInvestorQuestion();
        kiq.questionBool = temp.user.questionBool;
        kiq.questionString = temp.user.questionString;
        kiq.user = user._id;

        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} updated account type`);
            kiq.save();

            return res.status(200).json({
                success: true,
                user: t.toAuthJSON()
            });
        });
    }).catch(next);
});

router.put("/type-b", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        let temp = req.body;

        if (typeof temp.user.typeset !== "undefined") {
            user.typeset = temp.user.typeset;
        }

        if (typeof temp.user.status !== "undefined") {
            user.status = temp.user.status;
        }

        const company = new Company({
            name: temp.user.company.name,
            registrationNo: temp.user.company.registrationNo,
        });

        const address = new Address({
            company: company._id,
            address1: temp.user.company.address1,
            address2: temp.user.company.address2,
            city: temp.user.company.city,
            stateProvince: temp.user.company.stateProvince,
            postalCode: temp.user.postalCode,
            active: false,
        });

        company.address = address._id;
        user.company = company._id;
        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} updated account type`);

            company.save();
            address.save();

            return res.status(200).json({
                success: true,
                user: t.toAuthJSON()
            });
        });
    }).catch(next);
});

router.put("/change-password", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        let temp = req.body;

        console.log(req.body.user);

        if (!user.validPassword(temp.user.oldPassword)) {
            return res.status(200).json({
                success: false,
                message: "Current password is not valid.",
            });
        }

        if (temp.user.newPassword !== temp.user.confirmNewPassword) {
            return res.status(200).json({
                success: false,
                message: "Please re-type new password.",
            });
        }

        user.setPassword(temp.user.newPassword);
        user.save().then((t: UserModel) => {
            logAction(`User ${user.username} updated his/her password.`);

            return res.status(200).json({
                success: true,
                message: "Successfully changed password."
            });
        });
    }).catch(next);
});

router.get("/generate-mfa", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const secret = speakeasy.generateSecret();
    const url = speakeasy.otpauthURL({
        secret: secret.base32,
        encoding: "base32",
        label: "SmartFunding",
        algorithm: "sha512",
    });

    logAction(`User ${req.payload.username} generated multifactor auth code.`);

    return res.json({
        success: true,
        secretKey: secret.base32,
        otpUrl: url,
    });
});

router.put("/validate-mfa", auth.required, (req: Request, res: Response, next: NextFunction) => {
    // this has 60 second window time from token generation
    const verified = speakeasy.totp.verify({
        secret: req.body.user.secretKey,
        token: req.body.user.tokenInput,
        encoding: "base32",
        algorithm: "sha512",
        window: 2,
    });

    if (verified) {
        findById(req.payload.id, res, (user: UserModel) => {
            logAction(`User ${req.payload.username} validated successfully.`);

            user.secretKey = req.body.user.secret;
            user.status = req.body.user.status;
            user.save().then((t: UserModel) => {
                logAction(`User ${user.username} successfully updated his/her account mfa details.`);

                return res.status(200).json({
                    success: true,
                });
            });
        }).catch(next);
    } else {
        return res.status(200).json({
            success: false,
        });
    }
});

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    User.find({ role: { $not: /admin/ } }).then((t: UserModel[]) => {
        const pendingInvestorsCount = t.filter((r: UserModel) => {
            return r.typeset === "investor" && r.status !== "okay"
        }).length;
        const pendingBorrowersCount = t.filter((r: UserModel) => {
            return r.typeset === "borrower" && r.status !== "okay"
        }).length;
        const noTypeCount = t.filter((r: UserModel) => {
            return !r.typeset || r.typeset == ""
        }).length;

        if (Array.isArray(t)) {
            logAction(`User ${req.payload.username} requested member user list`);
            return res.json({
                success: true,
                count: t.length,
                pendingInvestorsCount: pendingInvestorsCount,
                pendingBorrowersCount: pendingBorrowersCount,
                discardedCount: noTypeCount,
                users: t.map((r: UserModel) => {

                    if (!r.forename || r.forename == "") r.forename = "undefined";

                    if (!r.surname || r.surname == "") r.surname = "undefined";

                    if (!r.typeset || r.typeset == "") r.typeset = "undefined";

                    r.hash = undefined;
                    r.salt = undefined;
                    r.__v = undefined;
                    return r;
                }),
            });
        }
    }).catch(next);
});

function statusConvert(stat: string) {
    switch (stat) {
        case "new": return "step";
        case "pending": return "pending";
        case "active": return "okay";
        case "inactive": return "locked";
        case "locked": return "locked";
        case "rejected": return "deleted";
        default: return "step";
    }
}

router.get("/investors-list/:status", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let status = statusConvert(req.params.status);
    User.find({ role: { $not: /admin/ }, typeset: "investor", status: new RegExp(status, "i") }).then((t: UserModel[]) => {
        if (Array.isArray(t)) {
            logAction(`User ${req.payload.username} requested member user list`);
            return res.json({
                success: true,
                count: t.length,
                users: t.map((r: UserModel) => {
                    if (!r.forename || r.forename == "") r.forename = "undefined";

                    if (!r.surname || r.surname == "") r.surname = "undefined";

                    if (!r.typeset || r.typeset == "") r.typeset = "undefined";

                    r.hash = undefined;
                    r.salt = undefined;
                    r.__v = undefined;
                    return r;
                }),
            });
        }
    }).catch(next);
});

router.get("/borrowers-list/:status", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let status = statusConvert(req.params.status);
    User.find({
        role: { $not: /admin/ },
        typeset: "borrower",
        status: new RegExp(status, "i")
    })
        .populate("company")
        .then((t: any[]) => {
            if (Array.isArray(t)) {
                logAction(`User ${req.payload.username} requested member user list`);

                return res.json({
                    success: true,
                    count: t.length,
                    users: t.map((r: UserModel) => {

                        if (!r.forename || r.forename == "") r.forename = "undefined";

                        if (!r.surname || r.surname == "") r.surname = "undefined";

                        if (!r.typeset || r.typeset == "") r.typeset = "undefined";

                        r.hash = undefined;
                        r.salt = undefined;
                        r.__v = undefined;

                        return r;
                    }),
                });
            }
        }).catch(next);
});

router.post("/new-power-user", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.status = statusConvert(req.body.user.status);
    user.role = req.body.user.role;
    user.isMailVerified = true;

    const randomString = Math.random().toString(36).slice(-8);
    user.setPassword(randomString);

    const verificationToken = Math.random().toString(36).substring(7);
    let content = fs.readFileSync("./templates/email/confirm_mail_register.html", "utf8");
    content = content.replace(/base_url/g, baseUri);
    content = content.replace(/sf_verification_code/g, verificationToken);

    const params = {
        Destination: {
            ToAddresses: [user.email]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: content
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "SmartFunding Registration"
            }
        },
        Source: "noreply@ses.smartfunding.io"
    };

    User.findOne({ "email": user.email }).then((u: UserModel) => {
        if (u) {
            return res.status(422).json({
                success: false,
                message: "email is already registered"
            });
        }

        user.save().then((t: UserModel) => {
            AWS.config.update({ region: "us-west-2" });
            const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
                .sendEmail(params)
                .promise();

            sendPromise
                .then(data => console.log(data))
                .catch(err => console.error(err));

            return res.json({
                success: true,
                user: t.toAuthJSON(),
            });
        }).catch(next);

    }).catch(next);
});

router.post("/new-account", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.typeset = req.body.user.typeset;
    user.status = statusConvert(req.body.user.status);
    if (user.status == "step") {
        user.status = user.status + "1";
    }
    user.isMailVerified = true;

    const randomString = Math.random().toString(36).slice(-8);
    user.setPassword(randomString);

    const verificationToken = Math.random().toString(36).substring(7);
    let content = fs.readFileSync("./templates/email/confirm_mail_register.html", "utf8");
    content = content.replace(/base_url/g, baseUri);
    content = content.replace(/sf_verification_code/g, verificationToken);

    const params = {
        Destination: {
            ToAddresses: [user.email]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: content
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "SmartFunding Registration"
            }
        },
        Source: "noreply@ses.smartfunding.io"
    };

    User.findOne({ "email": user.email }).then((u: UserModel) => {
        if (u) {
            return res.status(422).json({
                success: false,
                message: "email is already registered"
            });
        }

        user.save().then((t: UserModel) => {
            AWS.config.update({ region: "us-west-2" });
            const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
                .sendEmail(params)
                .promise();

            sendPromise
                .then(data => console.log(data))
                .catch(err => console.error(err));

            return res.json({
                success: true,
                user: t.toAuthJSON(),
            });
        }).catch(next);

    }).catch(next);
});

router.post("/new-loan", auth.required, (req: Request, res: Response, next: NextFunction) => {
    let d = new Loan();

    d.borrower = req.payload._id;
    d.amount = req.body.user.amount;
    d.period = req.body.user.term;
    d.eirPercent = req.body.user.eir;
    d.aprPercent = req.body.user.apr;
    d.processingFee = req.body.user.processingFee;
    d.closingDate = req.body.user.closingDate;
    d.loanPurpose = req.body.user.loanPurpose;
    d.documentPrepared = req.body.user.documentPrepared;
    d.contractSigned = req.body.user.contractSigned;
    d.isNotified = req.body.user.notified;
    d.status = "pending";

    d.loanDocument = req.body.user.loanDocument.name;
    d.save().then((t: LoanModel) => {
        return res.json({
            success: true,
            loan: t,
        });
    }).catch(next);
});

router.get("/power-user-list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    User.find({ role: { $not: /member/ } }).then((t: UserModel[]) => {
        if (Array.isArray(t)) {
            logAction(`User ${req.payload.username} requested power user list`);
            return res.json({
                success: true,
                count: t.length,
                users: t.map((r: UserModel) => {
                    if (!r.forename || r.forename == "") r.forename = "undefined";

                    if (!r.surname || r.surname == "") r.surname = "undefined";

                    if (!r.typeset || r.typeset == "") r.typeset = "undefined";

                    r.hash = undefined;
                    r.salt = undefined;
                    r.__v = undefined;
                    return r;
                }),
            });
        }
    }).catch(next);
});

function logAction(message: string) {
    const log = new Log();
    log.message = message;
    return log.save();
}

function findById(id: String, res: Response, fn: (user: UserModel) => void) {
    return User.findById(id).then((user: UserModel) => {
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "unauthorized access",
            });
        }
        return fn(user);
    });
}

export default router;
