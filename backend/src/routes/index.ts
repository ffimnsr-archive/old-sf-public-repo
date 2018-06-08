import { Router } from "express";
import * as api from "./api";

const router = Router();
router.use("/api", api);

export default router;


