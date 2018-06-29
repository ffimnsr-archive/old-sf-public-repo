import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import CountryList from "country-list";

const router = Router();

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  const c = CountryList().getData();
  res.json({
    success: true,
    countries: c,
  });

  // Country.find({}, (err: any, countries: CountryModel[]) => {
  //   const countryNames = countries.map((v: CountryModel) => v.name);
  //   res.json({
  //     success: true,
  //     countries: countryNames,
  //   });
  // });
});

export default router;
