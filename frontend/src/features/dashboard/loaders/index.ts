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
  const sort = url.searchParams.get("sort") || "";
  const page = url.searchParams.get("page") || "";
  const parsedPage = parseInt(page);
  const validPage = parsedPage && parsedPage > 0 ? parsedPage : 1;
  await queryClient.ensureQueryData(
    adminOrderListQuery({ search, status, sort, page: validPage }),
  );

  return { search, status, sort, page: validPage };
};
