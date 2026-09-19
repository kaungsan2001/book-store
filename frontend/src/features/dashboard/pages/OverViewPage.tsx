import {
  BookOpen,
  Boxes,
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  PackageCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@tanstack/react-query";

import { dashboardOverviewQuery } from "../api";

export default function OverViewPage() {
  const {
    data: { data },
  } = useSuspenseQuery(dashboardOverviewQuery());

  const overviewCards = [
    {
      title: "Total Products",
      value: data.products.total,
      description: "Books in your store",
      icon: BookOpen,
    },
    {
      title: "Total Orders",
      value: data.orders.total,
      description: "All customer orders",
      icon: ShoppingCart,
    },
    {
      title: "Total Users",
      value: data.users.total,
      description: "Registered customers",
      icon: Users,
    },
    {
      title: "Revenue",
      value: `${data.financials.revenue} MMK`,
      description: "Total store revenue",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage your online bookstore and monitor store performance.
        </p>
      </div>

      {/* Main statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>

                <Icon className="size-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>

                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Secondary statistics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order Status</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Orders that need your attention
                </p>
              </div>

              <PackageCheck className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/30">
                  <ShoppingCart className="size-4 text-yellow-600" />
                </div>

                <div>
                  <p className="text-sm font-medium">Pending Orders</p>

                  <p className="text-xs text-muted-foreground">
                    Waiting for admin action
                  </p>
                </div>
              </div>

              <Badge variant="secondary">{data.orders.pendingCount}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventory</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Monitor your book stock
                </p>
              </div>

              <Boxes className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                  <AlertTriangle className="size-4 text-red-600" />
                </div>

                <div>
                  <p className="text-sm font-medium">Low Stock Products</p>

                  <p className="text-xs text-muted-foreground">
                    Products that need restocking
                  </p>
                </div>
              </div>

              <Badge variant="destructive">{data.products.lowStockCount}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty state / API placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>

          <p className="text-sm text-muted-foreground">
            Your recent orders and store activity will appear here.
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <ShoppingCart className="mx-auto mb-2 size-8 text-muted-foreground" />

              <p className="text-sm font-medium">No activity yet</p>

              <p className="text-xs text-muted-foreground">
                Connect your API to display recent activity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
