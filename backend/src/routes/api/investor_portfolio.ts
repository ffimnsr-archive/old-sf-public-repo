import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as InvestorPortfolio, InvestorPortfolioModel } from "../../models/investor_portfolio";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    InvestorPortfolio.find({}).then((t: InvestorPortfolioModel[]) => {
        return res.json({
            success: true,
            investorPortfolios: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new InvestorPortfolio();

    console.log(d);
    d.save().then((t: InvestorPortfolioModel) => {
        return res.json({
            success: true,
            investorPortfolios: t,
        });
    }).catch(next);
});

export default router;
