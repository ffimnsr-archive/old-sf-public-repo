import crypto from "crypto";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import { secret } from "../config";

export type UserModel = mongoose.Document & {
    username: string,
    email: string,
    bio: string,
    image: string,
    hash: string,
    salt: string,
    secretKey: string,
    typeset: string,
    forename: string,
    surname: string,
    isMailVerified: boolean,
    isDocumentsSubmitted: boolean,
    kycStatus: mongoose.Schema.Types.ObjectId,
    address: mongoose.Schema.Types.ObjectId,
    wallet: mongoose.Schema.Types.ObjectId,
    company: mongoose.Schema.Types.ObjectId,
    remarks: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    validPassword: (password: string) => string,
    setPassword: (password: string) => void,
    generateJWT: () => string,
    toAuthJSON: () => Map<string, any>,
    toProfileJSONFor: () => Map<string, any>
};

const UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
    bio: String,
    image: String,
    hash: String,
    salt: String,
    secretKey: String,
    forename: String,
    surname: String,
    role: { type: String, enum: ["admin", "moderator", "member"], default: "member" },
    typeset: String,
    isMailVerified: { type: Boolean, default: false },
    isDocumentsSubmitted: { type: Boolean, default: false },
    kycStatus: { type: mongoose.Schema.Types.ObjectId, ref: "KycStatus" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    remarks: String,
    status: { type: String, enum: ["step1", "step2", "step3-1", "step3-2", "step4", "step5", "step6", "pending", "deleted", "locked", "okay"], default: "step1" },
    createdAt: Date,
    updatedAt: Date
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = function(password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    return this.hash === hash;
};

UserSchema.methods.setPassword = function(password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
        typeset: this.typeset,
        status: this.status,
        exp: exp.getTime() / 1000
    }, secret);
};

UserSchema.methods.toAuthJSON = function() {
    const token = this.generateJWT();
    return {
        username: this.username,
        fullname: this.fullname(),
        forename: this.forename,
        surname: this.surname,
        email: this.email,
        token: token,
        bio: this.bio,
        image: this.image,
        role: this.role,
        typeset: this.typeset,
        isMailVerified: this.isMailVerified,
        isDocumentsSubmitted: this.isDocumentsSubmitted,
        status: this.status,
    };
};

UserSchema.methods.toProfileJSONFor = function() {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image || "/favicon.png"
    };
};

UserSchema.methods.fullname = function() {
    return (this.forename + " " + this.surname);
};

const User: mongoose.Model<UserModel> = mongoose.model<UserModel>("User", UserSchema, "users");
export default User;
