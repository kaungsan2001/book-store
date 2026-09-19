import { Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { adminOrderListQuery } from "../api";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
function ClassNameForStatus(status: string) {
  const statusMap: Record<string, string> = {
    PENDING: "text-primary",
    CANCELLED: "text-danger",
    CONFIRMED: "text-success",
    DELIVERED: "text-blue-300",
  };

  return statusMap[status] || "";
}

export default function AdminOrderListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "";

  console.log("rerender");
  const {
    data: { data: orders },
  } = useSuspenseQuery(adminOrderListQuery({ search, status }));

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search,
      status,
      sort,
    },
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search order code, customer, email..."
              type="text"
              className="pl-9"
              {...register("search")}
            />
          </div>

          {/* Status */}
          <Select {...register("status")}>
            <SelectTrigger className="w-full md:w-44">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>

              <SelectItem value="PENDING">Pending</SelectItem>

              <SelectItem value="CONFIRMED">Confirmed</SelectItem>

              <SelectItem value="DELIVERED">Delivered</SelectItem>

              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select {...register("sort")}>
            <SelectTrigger className="w-full md:w-44">
              <SelectValue placeholder="Sort By Date" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>

              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit">Search</Button>
        </div>
      </form>

      {orders.length === 0 ? (
        <EmptyState />
      ) : (
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead className="w-25 text-center">No.</TableHead>
              <TableHead className="w-25 text-center">Order Code</TableHead>
              <TableHead className="text-center">Customer</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Payment</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              const totalItems = order.orderItems.reduce(
                (total, item) => total + item.quantity,
                0,
              );
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {order.orderCode}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.fullName}
                  </TableCell>
                  <TableCell className="text-center">{totalItems}</TableCell>
                  <TableCell className="text-center">
                    {order.totalPrice}
                  </TableCell>
                  <TableCell className="text-center">{order.payment}</TableCell>
                  <TableCell
                    className={`text-center ${ClassNameForStatus(order.status)}`}
                  >
                    {order.status}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button>View</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

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
