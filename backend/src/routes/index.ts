import express from "express";
import * as api from "./api";

let Router = express.Router();
Router.use("/api", api);

export default Router;


