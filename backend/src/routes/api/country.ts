import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as Country, CountryModel } from "../../models/country";
import CountryList from "country-list";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    Country.find({}).then((t: CountryModel[]) => {
        return res.json({
            success: true,
            countries: t,
        });
    }).catch(next);
});

export default router;
