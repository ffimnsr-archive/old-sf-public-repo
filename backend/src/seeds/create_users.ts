import mongoose, { Collection } from "mongoose";
import { mongoUri, redisUri } from "../config";
import { default as User, UserModel } from "../models/user";

mongoose.connect(mongoUri);

const docs = [
    {
        username: "support42",
        email: "support42@yopmail.com",
        password: "support42",
    },
    {
        username: "support43",
        email: "support43@yopmail.com",
        password: "support43",
    },
    {
        username: "support44",
        email: "support44@yopmail.com",
        password: "support44",
    },
    {
        username: "support45",
        email: "support45@yopmail.com",
        password: "support45",
    },
    {
        username: "support46",
        email: "support46@yopmail.com",
        password: "support46",
    },
    {
        username: "support47",
        email: "support47@yopmail.com",
        password: "support47",
    },
    {
        username: "support48",
        email: "support48@yopmail.com",
        password: "support48",
    },
    {
        username: "support49",
        email: "support49@yopmail.com",
        password: "support49",
    },
    {
        username: "support50",
        email: "support50@yopmail.com",
        password: "support50",
    },
    {
        username: "support51",
        email: "support51@yopmail.com",
        password: "support51",
    },
    {
        username: "support52",
        email: "support52@yopmail.com",
        password: "support52",
    },
    {
        username: "support53",
        email: "support53@yopmail.com",
        password: "support53",
    },
    {
        username: "support54",
        email: "support54@yopmail.com",
        password: "support54",
    },
    {
        username: "support55",
        email: "support55@yopmail.com",
        password: "support55",
    }
];

docs.forEach(function(doc) {
    const user = new User();

    user.username = doc.username;
    user.email = doc.email;
    user.isDocumentsSubmitted = false;
    user.isMailVerified = false;
    user.setPassword(doc.password);

    user.save();

    console.log("creating documents");
});

