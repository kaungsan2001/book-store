import { api } from "@/api/axios";
import type { OrderListResponse } from "../schema";

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
