import createHttpError from "http-errors";
import { prisma } from "../../database/db";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import type { ValidatedRequest } from "../../middlewares/validate.middleware";
import { type OrderCreateValues, OrderCreateSchema } from "./order.schema";
import type { Response } from "express";
import { getOrderDetailService, orderCreateService } from "./order.service";
import { sendResponse } from "../../utils/response";

export const createNewOrder = async (
  req: AuthenticatedRequest & ValidatedRequest<typeof OrderCreateSchema>,
  res: Response,
) => {
  const {
    orderItems,
    email,
    fullName,
    phone,
    address,
    city,
    township,
    note,
    payment,
  } = req.validated!.body;
  console.log(req.validated?.body);

  const userId = req.user!.id;
  const productIds = [...new Set(orderItems.map((i) => i.productId))];

  if (productIds.length !== orderItems.length)
    throw createHttpError(400, "Duplicated Products");

  // getting price from db
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      price: true,
    },
  });

  if (productIds.length !== products.length)
    throw createHttpError(
      400,
      "One or more products are invalid or no longer exist",
    );

  const productsWithEachTotalPrice = orderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const totalPrice = product!.price * item.quantity;
    return { ...item, totalPrice, price: product!.price };
  });

  const orderTotalPrice = productsWithEachTotalPrice.reduce(
    (total, current) => total + current.totalPrice,
    0,
  );

  const data = await orderCreateService({
    userId: userId.trim(),
    email: email.trim(),
    fullName: fullName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    city: city.trim(),
    township: township.trim(),
    note: note?.trim(),
    payment: payment.trim(),
    orderTotalPrice,
    productsWithEachTotalPrice,
  });

  sendResponse({ res, data, message: "success" });
};

export const updateOrder = async () => {};

export const getOrderList = async (userId: string) => {};

export const getOrderDetail = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const id = req.params.id as string;
  const { id: userId, role } = req.user!;

  const order = await getOrderDetailService(id);

  if (!order) throw createHttpError(404, "Not Found.");

  if (order?.userId !== userId || role !== "ADMIN")
    throw createHttpError(401, "Unauthorized");

  sendResponse({ res, data: order, message: "Order Detail" });
};
