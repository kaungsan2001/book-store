import type { AuthenticatedRequest } from "../../../middlewares/auth.middleware";
import type { Response } from "express";
import type { ValidatedRequest } from "../../../middlewares/validate.middleware";
import type { AdminOrderListSchema } from "./admin-order.schema";
import { adminOrderListService } from "./admin-order.service";
import { sendResponse } from "../../../utils/response";

export const adminOrderList = async (
  req: AuthenticatedRequest & ValidatedRequest<typeof AdminOrderListSchema>,
  res: Response,
) => {
  const { page, limit, searchKey, status } = req.validated!.query;
  const statusArray = ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"];
  const isValidStatus = statusArray.includes(status ?? "");

  const skip = (page - 1) * limit;
  const { totalCount, orders } = await adminOrderListService({
    skip,
    limit,
    searchKey,
    status: isValidStatus ? status : undefined,
  });

  const totalPages = Math.ceil(totalCount / limit);
  const meta = {
    totalPages,
    totalCount,
    currentPage: page,
    limit,
  };

  sendResponse({ res, data: orders, message: "Order List", meta });
};
