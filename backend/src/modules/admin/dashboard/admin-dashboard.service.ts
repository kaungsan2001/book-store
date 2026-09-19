import { prisma } from "../../../database/db";

export const overViewService = async () => {
  const [
    totalProducts,
    lowStockProductsCount,
    totalOrders,
    pendingOrders,
    ordersWithTotalPrice,
    totalUsers,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { inventory: { lte: 5 } } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      where: { status: "DELIVERED" },
      select: { totalPrice: true },
    }),
    prisma.user.count(),
  ]);

  const revenue = ordersWithTotalPrice.reduce(
    (total, current) => total + current.totalPrice,
    0,
  );

  return {
    totalProducts,
    lowStockProductsCount,
    totalOrders,
    pendingOrders,
    revenue,
    totalUsers,
  };
};
