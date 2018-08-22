import mongoose from "mongoose";
import { mongoUri, redisUri } from "../config";
import { default as User, UserModel } from "../models/user";

console.log("hello");
mongoose.connect(mongoUri);

const docs = [{}, {}];

User.insertMany(docs)
    .then(function() {
    })
    .catch(function(err: any) {
    });


