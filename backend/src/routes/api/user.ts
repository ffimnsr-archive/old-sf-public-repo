import mongoose from "mongoose";
import speakeasy from "speakeasy";
import passport from "passport";
// import ecc from "tiny-secp256k1";
import bitcoin from "bitcoinjs-lib";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as User, UserModel } from "../../models/user";
import { default as Address, AddressModel } from "../../models/address";
import { default as Wallet, WalletModel } from "../../models/wallet";
import { default as Company, CompanyModel } from "../../models/company";
import { default as Log } from "../../models/log";
import { walletWIF } from "../../config";

const router = Router();

router.get("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.payload.id)
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

router.put("/image", auth.required, (req: Request, res: Response, next: NextFunction) => {
    findById(req.payload.id, res, (user: UserModel) => {
        if (typeof req.body.user.image !== "undefined") {
            user.forename = req.body.user.image;
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

router.put("/type", auth.required, (req: Request, res: Response, next: NextFunction) => {
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

router.get("/generate-mfa", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const secret = speakeasy.generateSecret();
    const url = speakeasy.otpauthURL({
        secret: secret.base32,
        encoding: "base32",
        label: "SmartFunding",
        algorithm: "sha512",
    });

    logAction(`User ${req.payload.username} generated multifactor auth code`);

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
            logAction(`User ${req.payload.username} validated successfully`);

            user.secretKey = req.body.user.secret;
            user.status = req.body.user.status;
            user.save().then((t: UserModel) => {
                logAction(`User ${user.username} successfully updated account`);

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
        const investorsCount = t.filter((r: UserModel) => r.typeset == "investors" && r.status != "okay").length;
        const borrowersCount = t.filter((r: UserModel) => r.typeset == "borrowers" && r.status != "okay").length;
        const noTypeCount = t.filter((r: UserModel) => !r.typeset || r.typeset == "").length;
        if (Array.isArray(t)) {
            logAction(`User ${req.payload.username} requested user list`);
            return res.json({
                success: true,
                count: t.length,
                pendingInvestorsCount: investorsCount,
                pendingBorrowersCount: borrowersCount,
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

router.get("/get-eth-address", auth.required, (req: Request, res: Response, next: NextFunction) => {

});

router.get("/get-btc-address", auth.required, (req: Request, res: Response, next: NextFunction) => {
    // XXX: https://en.bitcoin.it/wiki/Wallet_import_format
    // Implementation derived from:
    //   https://github.com/bitcoinjs/bitcoinjs-lib
    const recipient = bitcoin.ECPair.fromWIF("");
    const nonce = bitcoin.ECPair.makeRandom();

    // const forSender = btcStealthSend(nonce.privateKey, recipient.publicKey);
    // return res.status(200).json({
    //   success: true,
    //   address: getAddress(forSender),
    // });
});

// function getAddress(node: any, network: any) {
//   return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
// }

// function btcStealthSend(e: any, Q: any) {
//   const eQ = ecc.pointMultiply(Q, e, true);
//   const c = bitcoin.crypto.sha256(eQ);
//   const Qc = ecc.pointAddScalar(Q, c);
//   const vG = bitcoin.ECPair.fromPublicKey(Qc);

//   return vG;
// }

// function btcGenerateP2SHMultiSig() {
//   // Generate P2SH from multi-sig
//   //   https://github.com/bitcoinjs/bitcoinjs-lib/blob/d8b66641b3ae3f3f5ad6f0c04a41877da20b34ef/test/integration/addresses.js#L48-L55
//   // TODO: implement

//   const pubkeys = [
//     '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
//     '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
//     '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
//   ].map((hex) => Buffer.from(hex, 'hex'))

//   const { address } = bitcoin.payments.p2sh({
//     redeem: bitcoin.payments.p2ms({ m: 2, pubkeys })
//   })
// }

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
