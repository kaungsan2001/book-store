import { Router } from "express";
import { auth } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { AdminOrderListSchema } from "./admin-order.schema";
import { adminOrderList } from "./admin-order.controller";

const router = Router();

router.get(
  "/",
  auth,
  authorize(["ADMIN"]),
  validate(AdminOrderListSchema),
  adminOrderList,
);

export default router;
