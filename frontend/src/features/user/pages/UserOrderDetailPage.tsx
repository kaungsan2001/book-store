import { useSuspenseQuery } from "@tanstack/react-query";
import { userOrderDetailQuery } from "../api";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { OrderStatus } from "../schema";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return "default";

    case "CANCELLED":
      return "destructive";

    case "PENDING":
      return "secondary";

    default:
      return "outline";
  }
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function UserOrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const {
    data: { data: order },
  } = useSuspenseQuery(userOrderDetailQuery(id));
  return (
    <main className="min-h-screen bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Header */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Button
              variant="outline"
              size="icon"
              className="mt-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="size-4" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Order Details
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Order #{order.orderCode}
              </p>
            </div>
          </div>

          <Badge
            variant={getStatusVariant(order.status)}
            className="w-fit px-3 py-1 text-sm"
          >
            {order.status}
          </Badge>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Order overview */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Package className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Order Code</p>

                <p className="truncate font-semibold">{order.orderCode}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CalendarDays className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Order Date</p>

                <p className="truncate font-semibold">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(order.createdAt))}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Payment</p>

                <p className="font-semibold uppercase">
                  {order.payment.trim()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Package className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Total</p>

                <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Main content */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ============================================================ */}
          {/* Left column */}
          {/* ============================================================ */}

          <div className="space-y-6">
            {/* ------------------------------------------------------------ */}
            {/* Order Items */}
            {/* ------------------------------------------------------------ */}

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>Order Items</CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.orderItems.length}{" "}
                      {order.orderItems.length === 1 ? "product" : "products"}
                    </p>
                  </div>

                  <Badge variant="outline">
                    {order.orderItems.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}{" "}
                    items
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {order.orderItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {/* Product image placeholder */}
                      <div className="flex size-24 shrink-0 items-center justify-center rounded-lg border bg-muted sm:size-28">
                        <img
                          src={item.product.productImages[0].imageUrl}
                          loading="lazy"
                          decoding="async"
                          alt=""
                        />
                      </div>

                      {/* Product info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-semibold leading-tight">
                              {item.product.name}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                              by {item.product.author}
                            </p>
                          </div>

                          <p className="font-semibold sm:text-right">
                            {formatPrice(item.totalPrice)}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">
                            Qty: {item.quantity}
                          </Badge>

                          {/* {item.product.discount > 0 && (
                            <Badge variant="outline">
                              {item.product.discount}% OFF
                            </Badge>
                          )} */}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                          <span>Unit price: {formatPrice(item.price)}</span>

                          {/* <span>Stock: {item.product.inventory}</span> */}
                        </div>
                      </div>
                    </div>

                    {index < order.orderItems.length - 1 && (
                      <Separator className="mt-5" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------ */}
            {/* Customer Information */}
            {/* ------------------------------------------------------------ */}

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <User className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Full Name</p>

                      <p className="font-medium">{order.fullName}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Phone className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Phone</p>

                      <p className="font-medium">{order.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:col-span-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <User className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Email</p>

                      <p className="break-all font-medium">{order.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------ */}
            {/* Shipping Address */}
            {/* ------------------------------------------------------------ */}

            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <MapPin className="size-4" />
                  </div>

                  <div>
                    <p className="font-medium">{order.fullName}</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {order.address}
                      <br />
                      {order.township}, {order.city}
                      <br />
                      {order.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------ */}
            {/* Order Note */}
            {/* ------------------------------------------------------------ */}

            {order.note?.trim() && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Note</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {order.note}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ============================================================ */}
          {/* Right column */}
          {/* ============================================================ */}

          <div className="space-y-6">
            {/* ------------------------------------------------------------ */}
            {/* Price Summary */}
            {/* ------------------------------------------------------------ */}

            <Card className="lg:sticky lg:top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Subtotal</span>

                    <span className="font-medium">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Shipping</span>

                    <span className="font-medium">Free</span>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">Total</span>

                    <span className="text-xl font-bold">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        Payment Method
                      </span>

                      <Badge variant="outline" className="uppercase">
                        {order.payment.trim()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------ */}
            {/* Order Status */}
            {/* ------------------------------------------------------------ */}

            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                      <Package className="size-5" />
                    </div>

                    <div>
                      <p className="font-medium">Current Status</p>

                      <Badge
                        variant={getStatusVariant(order.status)}
                        className="mt-1"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Created At</p>

                    <p className="mt-1 text-sm font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last Updated
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {formatDate(order.updatedAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
