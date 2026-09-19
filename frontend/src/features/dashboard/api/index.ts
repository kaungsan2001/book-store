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
}: {
  search?: string | null;
  status?: string | null;
}): Promise<AdminOrderListResponse> => {
  let query = search ? `searchKey=${search}` : "limit=10";
  query += status ? `&status=${status}` : "";
  const res = await api.get(`/admin/orders?${query}`);
  return res.data;
};

export const adminOrderListQuery = ({
  search = null,
  status = null,
}: {
  search?: string | null;
  status?: string | null;
}) => ({
  queryKey: ["admin", "orders", search, status],
  queryFn: () => fetchAdminOrderList({ search, status }),
});
