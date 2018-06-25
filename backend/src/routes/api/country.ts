import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as Country, CountryModel } from "../../models/country";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Country.find({}, function(err: any, countries: CountryModel[]) => {
    let countryMap = {};

    countries.forEach((country: CountryModel) => {
      countryMap[country._id] = country;
    });

    res.send(countryMap);
  });
});

export default router;
