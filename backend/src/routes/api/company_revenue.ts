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

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const country = new Country();

    country.code = req.body.user.code;
    country.name = req.body.user.name;
    country.status = req.body.user.status;

    console.log(country);
    country.save().then((t: CountryModel) => {
        return res.json({
            success: true,
            user: t,
        });
    }).catch(next);
});

export default router;
