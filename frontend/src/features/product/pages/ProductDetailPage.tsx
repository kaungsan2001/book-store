import { useSuspenseQuery } from "@tanstack/react-query";
import { productDetailQuery } from "../api";
import { useParams } from "react-router";
import { useState } from "react";
import {
  ShoppingCart,
  CreditCard,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data } = useSuspenseQuery(productDetailQuery(id as string));

  const product = data.data;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.productImages;

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("prev work");
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full overflow-hidden rounded-md border bg-muted shadow-sm">
            <img
              src={images[currentImageIndex]?.imageUrl}
              alt={`${product.name} cover`}
              className="h-full w-full object-contain"
            />

            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2  rounded-full bg-background/80 backdrop-blur-sm"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2  rounded-full bg-background/80 backdrop-blur-sm"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-3/4 w-20 shrink-0 overflow-hidden rounded-md border bg-muted transition-all ${
                    index === currentImageIndex
                      ? "ring-2 ring-primary"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Book Information & Purchase Controls */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Badge
                variant="secondary"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                {product.category.name}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-destructive"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <p className="text-lg text-muted-foreground">
              by{" "}
              <span className="font-medium text-foreground">
                {product.author}
              </span>
            </p>

            <div className="text-3xl font-bold tracking-tight text-foreground">
              ${product.price.toFixed(2)}
            </div>

            <Card className="bg-card/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  Description
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Controls Section */}
          <div className="space-y-4 border-t pt-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Quantity
              </span>
              <div className="flex items-center rounded-md border bg-background">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 border-primary text-primary hover:bg-primary/5 font-semibold"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                className="w-full gap-2 font-semibold shadow-md shadow-primary/10"
              >
                <CreditCard className="h-5 w-5" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
