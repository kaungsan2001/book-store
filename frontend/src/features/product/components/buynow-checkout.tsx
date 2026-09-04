import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productDetailQuery } from "../api";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function BuyNowCheckOut({
  productId,
  register,
  quantity,
}: {
  productId: string;
  register: any;
  quantity: number;
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

        <div className=" text-sm">
          <div className="space-y-1">
            <p>{product.name}</p>
            <p className="text-muted-foreground">Quantity : {quantity}</p>
            <span className="text-muted-foreground">
              Price : {product.price}
            </span>
            <Separator className="my-5" />
            <p className="font-medium  float-end">
              Total : {quantity * product.price}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
