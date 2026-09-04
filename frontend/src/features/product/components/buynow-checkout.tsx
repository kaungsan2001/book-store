import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productDetailQuery } from "../api";
import { Input } from "@/components/ui/input";

export default function BuyNowCheckOut({
  productId,
  register,
}: {
  productId: string;
  register: any;
}) {
  const {
    data: { data: product },
  } = useSuspenseQuery(productDetailQuery(productId));

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="hidden" value={[productId]} {...register("productIds")} />

        <div className="flex justify-between text-sm">
          <div>
            <p>{product.name}</p>
            <p>Quantity : 1</p>
            <span className="text-muted-foreground">Subtotal : </span>
            <span className="font-medium">{product.price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
