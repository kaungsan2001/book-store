import { prisma } from "../../database/db";
import type { OrderCreateValues } from "./order.schema";

type OrderCreate = {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  township: string;
  note: string | undefined;
  payment: string;
  orderTotalPrice: number;
  productsWithEachTotalPrice: {
    productId: string;
    quantity: number;
    totalPrice: number;
    price: number;
  }[];
};

export const orderCreateService = async ({
  userId,
  email,
  fullName,
  phone,
  address,
  city,
  township,
  note,
  payment,
  orderTotalPrice,
  productsWithEachTotalPrice,
}: OrderCreate) => {
  return await prisma.order.create({
    data: {
      userId,
      email,
      fullName,
      phone,
      address,
      city,
      township,
      note,
      payment,
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
};

export const getOrderDetailService = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
    },
  });
};
