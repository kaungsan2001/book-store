import { Router } from "express";
import { auth } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { dashboardOverview } from "./admin-dashboard.controller";

const router = Router();

router.get("/over-view", auth, authorize(["ADMIN"]), dashboardOverview);
export default router;
