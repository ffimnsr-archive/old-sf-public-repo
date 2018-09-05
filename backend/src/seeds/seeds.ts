import mongoose, { Collection } from "mongoose";
import { mongoUri, redisUri } from "../config";
import { default as User, UserModel } from "../models/user";
import { default as LoanPurpose, LoanPurposeModel } from "../models/loan_purpose";
import { default as Country, CountryModel } from "../models/country";
import { default as CompanyRevenue, CompanyRevenueModel } from "../models/company_revenue";
import { default as CreditRate, CreditRateModel } from "../models/credit_rate";
import { default as Industry, IndustryModel } from "../models/industry";

mongoose.connect(mongoUri);

const users = [
    {
        username: "support42",
        email: "support42@yopmail.net",
        password: "support42",
    },
    {
        username: "support43",
        email: "support43@yopmail.net",
        password: "support43",
    },
    {
        username: "support44",
        email: "support44@yopmail.net",
        password: "support44",
        typeset: "borrower",
    },
    {
        username: "support45",
        email: "support45@yopmail.net",
        password: "support45",
        typeset: "borrower",
    },
    {
        username: "support46",
        email: "support46@yopmail.net",
        password: "support46",
        typeset: "borrower",
    },
    {
        username: "support47",
        email: "support47@yopmail.net",
        password: "support47",
        typeset: "investor",
    },
    {
        username: "support48",
        email: "support48@yopmail.net",
        password: "support48",
        typeset: "investor",
    },
    {
        username: "support49",
        email: "support49@yopmail.net",
        password: "support49",
        typeset: "investor",
    },
    {
        username: "support50",
        email: "support50@yopmail.net",
        password: "support50",
        typeset: "investor",
    },
    {
        username: "support51",
        email: "support51@yopmail.net",
        password: "support51",
        typeset: "borrower",
    },
    {
        username: "support52",
        email: "support52@yopmail.net",
        password: "support52",
        typeset: "borrower",
    },
    {
        username: "support53",
        email: "support53@yopmail.net",
        password: "support53",
        typeset: "borrower",
    },
    {
        username: "support54",
        email: "support54@yopmail.net",
        password: "support54",
        typeset: "borrower",
    },
    {
        username: "support55",
        email: "support55@yopmail.net",
        password: "support55",
        typeset: "password"
    }
];

users.forEach(function(doc) {
    const d = new User();

    d.username = doc.username;
    d.email = doc.email;
    d.isDocumentsSubmitted = false;
    d.isMailVerified = true;
    d.typeset = doc.typeset;
    d.setPassword(doc.password);

    d.save();
    console.log("creating users");
});

const loan_purposes = [
    { name: "Business Startup", status: "active" },
    { name: "Expansion", status: "active" },
    { name: "House Buying", status: "active" },
    { name: "Office Expansion", status: "active" },
];

loan_purposes.forEach(function(doc) {
    const d = new LoanPurpose();

    d.name = doc.name;
    d.status = doc.status;
    d.save();
    console.log("creating loan purposes");
});

const company_revenues = [
    { name: "0 - 100,000", status: "active" },
    { name: "100,001 - 500,000", status: "active" },
    { name: "500,001 - 1,000,000", status: "active" },
    { name: "1,000,001 - 5,000,000", status: "active" },
    { name: "5,000,001 - 100,000,000", status: "active" },
];

company_revenues.forEach(function(doc) {
    const d = new CompanyRevenue();

    d.revenue = doc.name;
    d.status = doc.status;
    d.save();
    console.log("creating company revenues");
});

const credit_rates = [
    { name: "A+", status: "active" },
    { name: "A-", status: "active" },
    { name: "B+", status: "active" },
    { name: "B-", status: "active" },
    { name: "C+", status: "active" },
];

credit_rates.forEach(function(doc) {
    const d = new CreditRate();

    d.rate = doc.name;
    d.status = doc.status;
    d.save();
    console.log("creating credit rates");
});

const countries = [
    { code: "SG", name: "Singapore", status: "active" },
    { code: "MY", name: "Malaysia", status: "active" },
    { code: "ID", name: "Indonesia", status: "active" },
    { code: "PH", name: "Philippines", status: "active" },
    { code: "HK", name: "Hong Kong", status: "active" },
    { code: "CN", name: "China", status: "active" },
    { code: "VN", name: "Vietnam", status: "active" },
];

countries.forEach(function(doc) {
    const d = new Country();

    d.code = doc.code;
    d.name = doc.name;
    d.status = doc.status;
    d.save();
    console.log("creating countries");
});



