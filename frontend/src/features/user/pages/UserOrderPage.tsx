import { useInfiniteQuery } from "@tanstack/react-query";
import { userOrdersInfiniteQuery } from "../api";
import { Button } from "@/components/ui/button";
import OrderCard from "../components/order-card";

export default function UserOrderPage() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(userOrdersInfiniteQuery());

  const orders = data?.pages.flatMap((page) => page.data);
  return (
    <div className="max-w-md mx-auto pt-3">
      <div className="flex flex-col gap-3">
        {orders?.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>

      <div className="flex justify-center mt-3">
        {hasNextPage && (
          <Button
            variant={"secondary"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
