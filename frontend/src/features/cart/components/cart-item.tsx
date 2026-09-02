import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCartStore from "@/features/cart/store";
import type { CartItem } from "../schema";
import { Trash2Icon } from "lucide-react";

export default function CartItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  return (
    <Card className="border-none rounded-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{item.name}</CardTitle>
        <Button
          onClick={() => removeItem(item.id)}
          variant="destructive"
          size="icon"
        >
          <Trash2Icon />
        </Button>
      </CardHeader>
      <CardContent>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            Quantity
          </span>

          <div className="flex items-center rounded-md border bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => updateQuantity(item.quantity - 1, item.id)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => updateQuantity(item.quantity + 1, item.id)}
            >
              +
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
