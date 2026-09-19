import type { AuthenticatedRequest } from "../../../middlewares/auth.middleware";
import { sendResponse } from "../../../utils/response";
import { overViewService } from "./admin-dashboard.service";
import type { Response } from "express";

export const dashboardOverview = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const {
    totalProducts,
    lowStockProductsCount,
    totalOrders,
    pendingOrders,
    revenue,
    totalUsers,
  } = await overViewService();

  const formatted = {
    products: {
      total: totalProducts,
      lowStockCount: lowStockProductsCount,
    },
    orders: {
      total: totalOrders,
      pendingCount: pendingOrders,
    },
    users: {
      total: totalUsers,
    },
    financials: {
      revenue: revenue,
    },
  };

  sendResponse({ res, data: formatted, message: "Dashboard Overview." });
};
