import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import {
  createNewOrder,
  getOrderDetail,
  getOrderList,
  updateOrder,
} from "./order.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  GetOrderListSchema,
  OrderCreateSchema,
  OrderUpdateSchema,
} from "./order.schema";
import { authorize } from "../../middlewares/authorize.middleware";

const router = Router();

router.post("/create", auth, validate(OrderCreateSchema), createNewOrder);
router.get("/:id", auth, getOrderDetail);
router.get("/", auth, validate(GetOrderListSchema), getOrderList);
router.patch(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  validate(OrderUpdateSchema),
  updateOrder,
);

export default router;
