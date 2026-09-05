import { api } from "@/api/axios";
import type { OrderListResponse, OrderDetailResponse } from "../schema";

const fetchUserOrders = async ({
  pageParam = null,
}): Promise<OrderListResponse> => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";

  const res = await api.get(`/orders${query}`);
  return res.data;
};

export const userOrdersInfiniteQuery = () => ({
  queryKey: ["user", "orders"],
  queryFn: fetchUserOrders,
  initialPageParam: null,
  getNextPageParam: (lastPage: any) => lastPage.meta.nextCursor,
});

const fetchUserOrderDetail = async (
  id: string,
): Promise<OrderDetailResponse> => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

export const userOrderDetailQuery = (id: string) => ({
  queryKey: ["user", "orders", id],
  queryFn: () => fetchUserOrderDetail(id),
});
