import createHttpError from "http-errors";
import { prisma } from "../../database/db";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import type { ValidatedRequest } from "../../middlewares/validate.middleware";
import {
  type OrderCreateValues,
  GetOrderListSchema,
  OrderCreateSchema,
  OrderUpdateSchema,
} from "./order.schema";
import type { Response } from "express";
import {
  getOrderDetailService,
  orderCreateService,
  orderListService,
  updateOrderService,
} from "./order.service";
import { sendResponse } from "../../utils/response";

import { customAlphabet } from "nanoid";
// Letters and numbers, excluding confusing ones (0, O, 1, I, L)
const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

// Generates a 9-character random string (e.g., "K7X9W2PL3")
const generateNanoCode = customAlphabet(alphabet, 9);

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

  // used db transaction to prevent Race-Condition Bug
  // create new order and update product's inventory
  const newOrder = await prisma.$transaction(async (tx) => {
    // query products to get each product's price
    const products = await tx.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        price: true,
        inventory: true,
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

    // const data = await orderCreateService({
    //   userId: userId.trim(),
    //   email: email.trim(),
    //   orderCode: "ORD-" + generateNanoCode(),
    //   fullName: fullName.trim(),
    //   phone: phone.trim(),
    //   address: address.trim(),
    //   city: city.trim(),
    //   township: township.trim(),
    //   note: note?.trim(),
    //   payment: payment.trim(),
    //   orderTotalPrice,
    //   productsWithEachTotalPrice,
    // });
    const newOrder = await tx.order.create({
      data: {
        userId: userId.trim(),
        email: email.trim(),
        orderCode: "ORD-" + generateNanoCode(),
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        township: township.trim(),
        note: note?.trim(),
        payment: payment.trim(),

        totalPrice: orderTotalPrice,
        status: "PENDING",
        orderItems: {
          createMany: {
            data: productsWithEachTotalPrice,
          },
        },
      },
      include: {
        orderItems: true,
      },
    });

    for (const item of orderItems) {
      const updatedProduct = await tx.product.update({
        where: { id: item.productId, inventory: { gte: item.quantity } },

        data: {
          inventory: {
            decrement: item.quantity,
          },
        },
      });
      if (!updatedProduct) {
        throw createHttpError(400);
      }
    }

    return newOrder;
  });

  sendResponse({ res, data: newOrder, message: "success" });
};

export const updateOrder = async (
  req: AuthenticatedRequest & ValidatedRequest<typeof OrderUpdateSchema>,
  res: Response,
) => {
  const { role } = req.user!;
  const { status } = req.validated!.body;
  const { id: orderId } = req.validated!.params;
  if (role !== "ADMIN") throw createHttpError(401, "Unauthorized");

  const data = await updateOrderService(orderId, status);
  sendResponse({ res, data, message: "Order Updated" });
};

export const getOrderList = async (
  req: AuthenticatedRequest & ValidatedRequest<typeof GetOrderListSchema>,
  res: Response,
) => {
  const userId = req.user!.id;
  const { limit, cursor } = req.validated!.query;

  const { totalCount, orders } = await orderListService({
    limit,
    cursor,
    userId,
  });

  const hasNextPage = orders.length > limit;
  let nextCursor;
  if (hasNextPage) {
    const lastItem = orders[orders.length - 1];
    nextCursor = lastItem?.id;
    orders.pop();
  }

  const meta = {
    totalCount,
    hasNextPage,
    nextCursor,
  };
  console.log(orders);
  sendResponse({ res, data: orders, meta, message: "Order List" });
};

export const getOrderDetail = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const id = req.params.id as string;
  const { id: userId, role } = req.user!;
  console.log(id);

  const order = await getOrderDetailService(id);
  console.log("order", order);

  if (!order) throw createHttpError(404, "Not Found.");

  if (order?.userId !== userId || role !== "ADMIN")
    throw createHttpError(401, "Unauthorized");

  sendResponse({ res, data: order, message: "Order Detail" });
};
