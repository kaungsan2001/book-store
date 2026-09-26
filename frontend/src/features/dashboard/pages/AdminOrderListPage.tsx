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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Controller, useForm } from "react-hook-form";

type Filters = {
  search: string;
  sort: string;
  status: string;
};

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

  // URL -> query values
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const pageParam = Number(searchParams.get("page"));
  const page = pageParam > 0 ? pageParam : 1;

  const {
    data: { data: orders, meta },
  } = useSuspenseQuery(
    adminOrderListQuery({
      search,
      status,
      sort,
      page,
    }),
  );

  const { register, handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      search,
      status,
      sort,
    },
  });

  /*
   * Submit filters -> URL
   */
  function onSubmit(data: Filters) {
    const params = new URLSearchParams();

    if (data.search.trim()) {
      params.set("search", data.search.trim());
    }

    if (data.status && data.status !== "ALL") {
      params.set("status", data.status);
    }

    if (data.sort) {
      params.set("sort", data.sort);
    }

    // Always go back to page 1 when filters change.
    params.set("page", "1");

    setSearchParams(params);
  }

  /*
   * Clear form AND URL.
   */
  // function clearAllFilter() {
  //   // First reset React Hook Form.
  //   reset({
  //     search: "",
  //     status: "",
  //     sort: "",
  //   });

  //   // Then clear URL.
  //   setSearchParams({});
  // }

  /*
   * Pagination.
   */
  function handlePageChange(nextPage: number) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", String(nextPage));

      return params;
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
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
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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
            )}
          />

          {/* Sort */}
          <Controller
            name="sort"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full md:w-44">
                  <SelectValue placeholder="Sort By Date" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="asc">Asc</SelectItem>

                  <SelectItem value="desc">Desc</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Button type="submit">Search</Button>

          {/* <Button type="button" variant="destructive" onClick={clearAllFilter}>
            Clear
          </Button> */}
        </div>
      </form>

      {/* Orders */}
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
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>

                  <TableCell className="text-center font-medium">
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
                    className={`text-center ${ClassNameForStatus(
                      order.status,
                    )}`}
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

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <Pagination className="mt-5">
          <PaginationContent>
            {Array.from({ length: meta.totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </Pagination>
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
