import { api } from "@/api/axios";
import type {
  AdminOrderListResponse,
  DashboardOverviewResponse,
} from "../schema";

export const fetchDashboardOverview =
  async (): Promise<DashboardOverviewResponse> => {
    const res = await api.get("/admin/dashboard/over-view");
    return res.data;
  };

export const dashboardOverviewQuery = () => ({
  queryKey: ["dashboard", "overview"],
  queryFn: fetchDashboardOverview,
});

const fetchAdminOrderList = async ({
  search = null,
  status = null,
  sort = null,
  page,
}: {
  search?: string | null;
  status?: string | null;
  sort?: string | null;
  page: number;
}): Promise<AdminOrderListResponse> => {
  let query = search ? `search=${search}` : `limit=10`;
  query += page ? `&page=${page}` : "";
  query += status ? `&status=${status}` : "";
  query += sort ? `&sort=${sort}` : "";
  const res = await api.get(`/admin/orders?${query}`);
  return res.data;
};

export const adminOrderListQuery = ({
  search = null,
  status = null,
  sort = null,
  page,
}: {
  search?: string | null;
  status?: string | null;
  sort?: string | null;
  page: number;
}) => ({
  queryKey: ["admin", "orders", { search, status, sort, page }],
  queryFn: () => fetchAdminOrderList({ search, status, sort, page }),
});
