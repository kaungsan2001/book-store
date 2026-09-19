import { queryClient } from "@/api/query";
import { adminOrderListQuery, dashboardOverviewQuery } from "../api";
import type { LoaderFunctionArgs } from "react-router";

export const dashboardOverviewLoader = async () => {
  await queryClient.ensureQueryData(dashboardOverviewQuery());
};

export const adminOrderListLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("searchKey");
  const status = url.searchParams.get("status");
  await queryClient.ensureQueryData(adminOrderListQuery({ search, status }));

  return { search, status };
};
