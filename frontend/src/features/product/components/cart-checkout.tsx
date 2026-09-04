import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useCartStore from "@/features/cart/store";

export default function CartCheckOut() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col text-sm">
          {cartItems.map((item) => (
            <div key={item.id} className="border-b py-3">
              <p>{item.name}</p>
              <p className=" text-muted-foreground">Price : {item.price}</p>
              <p className=" text-muted-foreground">
                Quantity : {item.quantity}
              </p>

              <span className=" text-muted-foreground">
                SubTotal : {item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className="text-sm">
          {cartItems && (
            <span className="font-medium float-end">Total : {totalPrice}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
