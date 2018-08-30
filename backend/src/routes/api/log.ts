import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import CountryList from "country-list";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const c = CountryList().getData();
    res.json({
        success: true,
        countries: c,
    });
});

export default router;
