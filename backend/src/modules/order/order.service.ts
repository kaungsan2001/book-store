import { prisma } from "../../database/db";

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
  orderCode: string;
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
  orderCode,
}: OrderCreate) => {
  return await prisma.order.create({
    data: {
      userId,
      email,
      orderCode,
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

export const updateOrderService = async (
  id: string,
  status: "PENDING" | "DELIVERED" | "SHIPPING",
) => {
  return await prisma.order.update({
    where: { id },
    data: {
      status,
    },
  });
};

export const orderListService = async ({
  limit,
  cursor,
  userId,
}: {
  limit: number;
  cursor: string | undefined;
  userId: string;
}) => {
  const [totalCount, orders] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.order.findMany({
      where: {
        userId,
      },
      take: limit + 1,
      skip: cursor ? 1 : undefined,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    }),
  ]);
  console.log(orders);
  return { totalCount, orders };
};
