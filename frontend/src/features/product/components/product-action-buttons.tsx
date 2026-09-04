import { Button } from "@/components/ui/button";
import { CreditCard, ShoppingCart } from "lucide-react";
import type { Product } from "../schema";
import useCartStore from "@/features/cart/store";
import type { CartItem } from "@/features/cart/schema";

import { Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { productLikeToggleFn } from "../api";
import { useState } from "react";
import { queryClient } from "@/api/query";
import { Paths } from "@/config/constants";
import { useNavigate } from "react-router";
import useProductStore from "../store";

export function BuyNowButton({ product }: { product: Product }) {
  const navigate = useNavigate();
  const setBuyNowProduct = useProductStore((state) => state.setBuyNowProduct);
  return (
    <Button
      variant="default"
      className="mt-2 w-full sm:w-auto"
      onClick={() => {
        setBuyNowProduct(product);
        navigate(`${Paths.checkOut}?buynow=${product.id}`);
      }}
    >
      <CreditCard className="mr-2 h-4 w-4" />
      Buy Now
    </Button>
  );
}

export function AddToCartButton({
  product,
  quantity = 1,
}: {
  product: Product;
  quantity?: number;
}) {
  const addCartItem = useCartStore((state) => state.addCartItem);
  return (
    <Button
      variant="outline"
      className="mt-2 w-full sm:w-auto"
      onClick={() => addCartItem({ ...product, quantity })}
    >
      <ShoppingCart />
      Add to Cart
    </Button>
  );
}

export function RemoveFromCartButton({
  productId,
  setQuantity,
}: {
  productId: string;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const removeItem = useCartStore((state) => state.removeItem);
  return (
    <Button
      variant="destructive"
      className="mt-2 w-full sm:w-auto"
      onClick={() => {
        removeItem(productId);
        setQuantity?.(1); // for product detail page, reset quantity to 1 when removed from cart
      }}
    >
      <ShoppingCart />
      Remove From Cart
    </Button>
  );
}

export function QuantitySelector({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
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
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            updateQuantity(parseInt(e.target.value) || 1, item.id)
          }
          className="w-12 text-center text-sm font-medium bg-transparent border-0 focus:ring-0"
        />
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
  );
}

export function LikeToggleButton({
  productId,
  isLiked,
}: {
  productId: string;
  isLiked: boolean;
}) {
  const [like, setLike] = useState(isLiked);
  const { mutate } = useMutation({
    mutationFn: productLikeToggleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: () => {
      setLike(isLiked);
    },
    onMutate: () => {
      setLike(!like);
    },
  });
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-destructive"
        onClick={() => mutate(productId)}
      >
        {like ? (
          <Heart className="h-5 w-5" fill="red" color="red" />
        ) : (
          <Heart className="h-5 w-5" color="red" />
        )}
      </Button>
    </>
  );
}
