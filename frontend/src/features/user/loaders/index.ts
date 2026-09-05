import { queryClient } from "@/api/query";
import { userOrdersInfiniteQuery } from "../api";

export const userOrderListLoader = async () => {
  await queryClient.ensureInfiniteQueryData(userOrdersInfiniteQuery());
};
