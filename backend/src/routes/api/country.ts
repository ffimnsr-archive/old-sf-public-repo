import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as Country, CountryModel } from "../../models/country";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Country.find({}, (err: any, countries: CountryModel[]) => {
    const countryNames = countries.map((v: CountryModel) => v.name);
    res.json({
      success: true,
      countries: countryNames,
    });
  });
});

export default router;
