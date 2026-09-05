import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Order } from "../schema";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { Paths } from "@/config/constants";

export default function OrderCard({ order }: { order: Order }) {
  const navigate = useNavigate();
  return (
    <Card
      className="rounded-none cursor-pointer hover:bg-secondary"
      onClick={() => navigate(`${Paths.myOrders}/${order.id}`)}
    >
      <CardHeader>
        <div className="flex justify-between">
          <h1 className="text-md font-bold">{order.orderCode}</h1>
          {order.status === "PENDING" && (
            <Badge variant={"outline"} className="text-primary">
              {order.status}
            </Badge>
          )}
          {order.status === "SHIPPING" && (
            <Badge variant={"outline"} className="text-blue-400">
              {order.status}
            </Badge>
          )}
          {order.status === "DELIVERED" && (
            <Badge variant={"secondary"} className="text-green-400">
              {order.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {order.orderItems.map((item) => (
            <div className="flex gap-3">
              <span key={item.id} className="font-bold">
                {item.product.name}
              </span>
              <span>x {item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <span className="text-muted-foreground float-end">
            Ordered At :{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <p></p>
        <p>Total : {order.totalPrice}</p>
      </CardFooter>
    </Card>
  );
}
