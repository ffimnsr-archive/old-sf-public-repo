import { Router } from "express";
import { default as users } from "./user";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    success: true,
    message: "SmartFunding"
  });
});

// router.use("/", users);

export default router;
