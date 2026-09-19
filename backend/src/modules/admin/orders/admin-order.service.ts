import { prisma } from "../../../database/db";
import type { OrderStatus } from "../../../generated/prisma/enums";

export const adminOrderListService = async ({
  skip,
  limit,
  searchKey,
  status,
}: {
  skip: number;
  limit: number;
  searchKey: string | undefined;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "DELIVERED"
    | "CANCELLED"
    | "ALL"
    | undefined;
}) => {
  let whereClause: any = {};

  if (status) {
    whereClause.status = status;
  }

  if (searchKey) {
    whereClause.OR = [
      { orderCode: { contains: searchKey, mode: "insensitive" } },
      { fullName: { contains: searchKey, mode: "insensitive" } },
      { email: { contains: searchKey, mode: "insensitive" } },
      {
        orderItems: {
          some: {
            product: {
              name: { contains: searchKey, mode: "insensitive" },
            },
          },
        },
      },
    ];
  }
  const [totalCount, orders] = await Promise.all([
    prisma.order.count({
      where: whereClause,
    }),
    prisma.order.findMany({
      skip,
      take: limit,
      where: whereClause,
      include: {
        orderItems: true,
      },
    }),
  ]);

  return { totalCount, orders };
};
