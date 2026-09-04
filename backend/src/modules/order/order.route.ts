import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import {
  createNewOrder,
  getOrderDetail,
  getOrderList,
} from "./order.controller";
import { validate } from "../../middlewares/validate.middleware";
import { OrderCreateSchema } from "./order.schema";

const router = Router();

router.post("/create", auth, validate(OrderCreateSchema), createNewOrder);
router.get("/:id", auth, getOrderDetail);
router.get("/list", auth, getOrderList);

export default router;
