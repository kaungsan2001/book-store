import { prisma } from "../../../database/db";

export const adminOrderListService = async ({
  skip,
  limit,
  search,
  status,
  sort,
}: {
  skip: number;
  limit: number;
  search: string | undefined;
  status: "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED" | "ALL";
  sort: "asc" | "desc";
}) => {
  let whereClause: any = {};

  if (status) {
    whereClause.status = status === "ALL" ? undefined : status;
  }

  if (search) {
    whereClause.OR = [
      { orderCode: { contains: search, mode: "default" } },
      { fullName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      {
        orderItems: {
          some: {
            product: {
              name: { contains: search, mode: "insensitive" },
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
      take: limit + 1,
      where: whereClause,
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: sort,
      },
    }),
  ]);

  return { totalCount, orders };
};
