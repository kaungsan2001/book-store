import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/features/cart/store";
import { Badge } from "@/components/ui/badge";
import CartItem from "./cart-item";

export function CartSidebar() {
  const getCartItemCount = useCartStore((state) => state.getCartItemCount());
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <Sheet>
      <SheetTrigger className="h-8 gap-1.5 px-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 cursor-pointer rounded-md hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50">
        <div className="relative">
          <Badge className="absolute -top-4 text-primary" variant={"outline"}>
            {getCartItemCount}
          </Badge>
          <ShoppingCart className="h-4.5 w-4.5" />
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
          <SheetDescription>
            Manage your shopping cart items here.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-105 w-full">
          {cartItems?.map((item) => (
            <CartItem item={item} />
          ))}

          {cartItems.length === 0 && (
            <p className="text-sm text-muted-foreground text-center mt-5">
              Cart is Empty.
            </p>
          )}
        </ScrollArea>

        {cartItems.length > 0 && (
          <SheetFooter className="border-t border-gray-50 dark:border-gray-800">
            <Button type="submit">Buy Now</Button>
            <Button variant="destructive" onClick={() => clearCart()}>
              Clear Cart
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
