import { ArrowLeft, ArrowRight, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import type { Product } from "../schema";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import useCartStore from "@/features/cart/store";

export function ProductCard({ product }: { product: Product }) {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const isItemInCart = useCartStore((state) =>
    state.cartItems.some((item) => item.id === product.id),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.productImages || [];

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="border rounded-sm flex flex-col sm:flex-row overflow-hidden shadow-sm">
      {/* Carousel Container */}
      <div className="w-full sm:w-1/3 h-48 sm:h-auto relative group overflow-hidden flex items-center justify-center">
        {images.length > 0 ? (
          <>
            {/* Image Slider Track */}
            <div
              className="flex w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div key={idx} className="w-full h-full shrink-0">
                  <img
                    src={img?.imageUrl || ""}
                    alt={`${product.name} - Slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows (Visible on Hover) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                >
                  <ArrowLeft size={16} className="text-primary" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                >
                  <ArrowRight size={16} className="text-primary" />
                </button>

                {/* Bottom Dot Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-y-1/2 flex gap-1">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full transition-all`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-gray-400 text-xs">No Image</div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <Link
            to={`/products/${product.id}`}
            className="text-lg font-bold text-primary line-clamp-1"
          >
            {product.name}
          </Link>

          <p className="text-sm text-gray-500 italic mb-1">{product.author}</p>
          <Badge variant="secondary">{product.category.name}</Badge>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="mt-3">
          <p className="font-semibold text-sm">Price: ${product.price}</p>

          <div className="flex flex-col">
            {isItemInCart ? (
              <Button
                variant="destructive"
                className="mt-2 w-full sm:w-auto"
                onClick={() => removeItem(product.id)}
              >
                <ShoppingCart />
                Remove From Cart
              </Button>
            ) : (
              <Button
                variant="outline"
                className="mt-2 w-full sm:w-auto"
                onClick={() => addCartItem({ ...product, quantity: 1 })}
              >
                <ShoppingCart />
                Add to Cart
              </Button>
            )}
            <Button variant="default" className="mt-2 w-full sm:w-auto">
              <CreditCard className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
