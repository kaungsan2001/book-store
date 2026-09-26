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
  const { page, limit, search, status, sort } = req.validated!.query;
  console.log(search);

  const skip = (page - 1) * limit;

  const { totalCount, orders } = await adminOrderListService({
    skip,
    limit,
    search,
    status,
    sort,
  });

  let hasNextPage = false;

  if (orders.length > limit) {
    hasNextPage = true;
    orders.pop();
  }

  const totalPages = Math.ceil(totalCount / limit);
  const meta = {
    totalPages,
    totalCount,
    limit,
    hasNextPage,
    currentPage: page,
  };

  sendResponse({ res, data: orders, message: "Order List", meta });
};
