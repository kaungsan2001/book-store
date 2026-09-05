import { queryClient } from "@/api/query";
import { userOrderDetailQuery, userOrdersInfiniteQuery } from "../api";
import type { LoaderFunctionArgs } from "react-router";

export const userOrderListLoader = async () => {
  await queryClient.ensureInfiniteQueryData(userOrdersInfiniteQuery());
};

export const userOrderDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  await queryClient.ensureQueryData(userOrderDetailQuery(params.id!));
};
