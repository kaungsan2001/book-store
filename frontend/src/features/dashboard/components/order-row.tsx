import { Badge } from "@/components/ui/badge";
import type { Order } from "../schema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ShoppingBag } from "lucide-react";

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

export function OrderRow({ order }: { order: Order }) {
  const totalItems = order.orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const navigate = useNavigate();

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
        <Badge variant="outline">{order.status}</Badge>
      </div>

      {/* Actions */}
      <div>
        <Button onClick={() => navigate(`/admin/orders/${order.id}`)}>
          View
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Order Card                                                          */
/* -------------------------------------------------------------------------- */

export function MobileOrderRow({ order }: { order: Order }) {
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
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */
export function EmptyState() {
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
