import { Router } from "express";
import * as product from "../product/product.controller";
import { auth } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { GetOneSchema, GetProductListSchema } from "./product.schema";

const router = Router();
// prefix: /api/v1/products

router.get("/", auth, validate(GetProductListSchema), product.getMany);
router.get("/:id", auth, validate(GetOneSchema), product.getOne);
router.post("/", auth, authorize(["ADMIN"]), product.create);
router.put("/:id", auth, authorize(["ADMIN"]), product.update);
router.delete("/:id", auth, authorize(["ADMIN"]), product.remove);

export default router;
