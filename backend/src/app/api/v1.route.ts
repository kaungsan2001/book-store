import { Router } from "express";
import authRoutes from "../../modules/auth/auth.route";
import userRoutes from "../../modules/user/user.route";
import articleRoutes from "../../modules/article/article.route";
import productRoutes from "../../modules/product/product.route";
import categoryRoutes from "../../modules/category/category.route";
import orderRoutes from "../../modules/order/order.route";
import dashboardRoutes from "../../modules/admin/dashboard/admin-dashboard.route";
import adminOrderRoutes from "../../modules/admin/orders/admin-order.route";
const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);
router.use("/articles", articleRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);

router.use("/admin/dashboard", dashboardRoutes);
router.use("/admin/orders", adminOrderRoutes);

export default router;
