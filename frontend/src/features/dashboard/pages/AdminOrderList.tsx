import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Search,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

// Change this to your actual Prisma OrderStatus enum values.
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  totalPrice: number;

  productId: string;

  product: {
    id: string;
    name: string;
  };
}

export interface Order {
  id: string;
  userId: string;

  orderCode: string;

  email: string;
  fullName: string;
  phone: string;

  address: string;
  city: string;
  township: string;

  note?: string | null;

  payment: string;

  totalPrice: number;

  status: OrderStatus;

  orderItems: OrderItem[];

  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface OrderListProps {
  orders?: Order[];

  onViewOrder?: (order: Order) => void;

  onStatusChange?: (order: Order, status: OrderStatus) => void;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function AdminOrderListPage({
  orders = [],
  onViewOrder,
  onStatusChange,
}: OrderListProps) {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  /* ------------------------------------------------------------------------ */
  /* Filtering                                                                */
  /* ------------------------------------------------------------------------ */

  const filteredOrders = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch =
        !searchValue ||
        order.orderCode.toLowerCase().includes(searchValue) ||
        order.fullName.toLowerCase().includes(searchValue) ||
        order.email.toLowerCase().includes(searchValue) ||
        order.phone.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  /* ------------------------------------------------------------------------ */
  /* Pagination                                                               */
  /* ------------------------------------------------------------------------ */

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

  const currentPage = Math.min(page, totalPages);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (value: OrderStatus | "ALL") => {
    setStatusFilter(value);
    setPage(1);
  };

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Orders</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage customer orders.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShoppingBag className="size-4" />

            <span>{filteredOrders.length} orders</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search order code, customer, email..."
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status */}
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              handleStatusFilter(value as OrderStatus | "ALL")
            }
          >
            <SelectTrigger className="w-full md:w-44">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>

              <SelectItem value="PENDING">Pending</SelectItem>

              <SelectItem value="CONFIRMED">Confirmed</SelectItem>

              <SelectItem value="SHIPPED">Shipped</SelectItem>

              <SelectItem value="DELIVERED">Delivered</SelectItem>

              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {/* Empty state */}
        {paginatedOrders.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-[1.1fr_1.5fr_1.2fr_1fr_1fr_1fr_48px] items-center gap-4 border-b px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>Order</span>
                  <span>Customer</span>
                  <span>Items</span>
                  <span>Total</span>
                  <span>Payment</span>
                  <span>Status</span>
                  <span />
                </div>

                {paginatedOrders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    onView={() => onViewOrder?.(order)}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {paginatedOrders.map((order) => (
                <MobileOrderCard
                  key={order.id}
                  order={order}
                  onView={() => onViewOrder?.(order)}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {Math.min(
                  (currentPage - 1) * pageSize + 1,
                  filteredOrders.length,
                )}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {Math.min(currentPage * pageSize, filteredOrders.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filteredOrders.length}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>

              <span className="min-w-20 text-center text-sm">
                Page {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop Order Row                                                          */
/* -------------------------------------------------------------------------- */

interface OrderRowProps {
  order: Order;

  onView: () => void;

  onStatusChange?: (order: Order, status: OrderStatus) => void;
}

function OrderRow({ order, onView, onStatusChange }: OrderRowProps) {
  const totalItems = order.orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="grid grid-cols-[1.1fr_1.5fr_1.2fr_1fr_1fr_1fr_48px] items-center gap-4 border-b px-4 py-4 last:border-b-0">
      {/* Order */}
      <div>
        <p className="font-medium">{order.orderCode}</p>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatDate(order.createdAt)}
        </p>
      </div>

      {/* Customer */}
      <div className="min-w-0">
        <p className="truncate font-medium">{order.fullName}</p>

        <p className="truncate text-xs text-muted-foreground">{order.email}</p>
      </div>

      {/* Items */}
      <div>
        <p className="font-medium">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>

        <p className="text-xs text-muted-foreground">
          {order.orderItems.length} product
          {order.orderItems.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Total */}
      <div>
        <p className="font-semibold">{formatCurrency(order.totalPrice)}</p>
      </div>

      {/* Payment */}
      <div>
        <Badge variant="outline">{order.payment}</Badge>
      </div>

      {/* Status */}
      <div>
        <OrderStatusSelect order={order} onStatusChange={onStatusChange} />
      </div>

      {/* Actions */}
      <div>
        <OrderActions order={order} onView={onView} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Order Card                                                          */
/* -------------------------------------------------------------------------- */

function MobileOrderCard({ order, onView, onStatusChange }: OrderRowProps) {
  const totalItems = order.orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="rounded-lg border p-4">
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{order.orderCode}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <OrderActions order={order} onView={onView} />
      </div>

      {/* Customer */}
      <div className="mt-4">
        <p className="font-medium">{order.fullName}</p>

        <p className="text-sm text-muted-foreground">{order.email}</p>

        <p className="text-sm text-muted-foreground">{order.phone}</p>
      </div>

      {/* Details */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Items</p>

          <p className="mt-1 text-sm font-medium">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Total</p>

          <p className="mt-1 text-sm font-semibold">
            {formatCurrency(order.totalPrice)}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Payment</p>

          <Badge variant="outline" className="mt-1">
            {order.payment}
          </Badge>
        </div>

        <div>
          <p className="mb-1 text-xs text-muted-foreground">Status</p>

          <OrderStatusSelect order={order} onStatusChange={onStatusChange} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Select                                                              */
/* -------------------------------------------------------------------------- */

interface OrderStatusSelectProps {
  order: Order;

  onStatusChange?: (order: Order, status: OrderStatus) => void;
}

function OrderStatusSelect({ order, onStatusChange }: OrderStatusSelectProps) {
  return (
    <Select
      value={order.status}
      onValueChange={(value) => onStatusChange?.(order, value as OrderStatus)}
    >
      <SelectTrigger
        className={`
          h-8 w-[125px] text-xs
          ${getStatusClass(order.status)}
        `}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>

        <SelectItem value="CONFIRMED">Confirmed</SelectItem>

        <SelectItem value="SHIPPED">Shipped</SelectItem>

        <SelectItem value="DELIVERED">Delivered</SelectItem>

        <SelectItem value="CANCELLED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

interface OrderActionsProps {
  order: Order;
  onView: () => void;
}

function OrderActions({ onView }: OrderActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />

          <span className="sr-only">Order actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 size-4" />
          View Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="size-5 text-muted-foreground" />
      </div>

      <h3 className="mt-4 font-semibold">No orders found</h3>

      <p className="mt-1 text-center text-sm text-muted-foreground">
        There are no orders matching your search.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatCurrency(value: number) {
  return `${value.toLocaleString()} MMK`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function getStatusClass(status: OrderStatus) {
  switch (status) {
    case "PENDING":
      return "border-yellow-300 bg-yellow-50 text-yellow-700";

    case "CONFIRMED":
      return "border-blue-300 bg-blue-50 text-blue-700";

    case "SHIPPED":
      return "border-purple-300 bg-purple-50 text-purple-700";

    case "DELIVERED":
      return "border-green-300 bg-green-50 text-green-700";

    case "CANCELLED":
      return "border-red-300 bg-red-50 text-red-700";

    default:
      return "";
  }
}
