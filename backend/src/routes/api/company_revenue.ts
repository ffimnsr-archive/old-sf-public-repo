import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import auth from "../auth";
import { default as CompanyRevenue, CompanyRevenueModel } from "../../models/company_revenue";

const router = Router();

router.get("/list", auth.required, (req: Request, res: Response, next: NextFunction) => {
    CompanyRevenue.find({}).then((t: CompanyRevenueModel[]) => {
        t.forEach(function(v: CompanyRevenueModel) {
            if (v.revenue === "" || !v.revenue) {
                v.revenue = "Wrong Option";
            }
        });
        return res.json({
            success: true,
            companyRevenues: t,
        });
    }).catch(next);
});

router.post("/", auth.required, (req: Request, res: Response, next: NextFunction) => {
    const d = new CompanyRevenue();

    d.revenue = req.body.user.revenue;
    d.status = req.body.user.status;

    d.save().then((t: CompanyRevenueModel) => {
        return res.json({
            success: true,
            user: t,
        });
    }).catch(next);
});

export default router;
