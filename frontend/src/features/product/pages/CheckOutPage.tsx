import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
  FieldError,
} from "@/components/ui/field";

import { useNavigate, useSearchParams } from "react-router";

import BuyNowCheckOut from "../components/buynow-checkout";
import CartCheckOut from "../components/cart-checkout";
import { OrderInformation, type OrderInformationType } from "../schema";
import { Button } from "@/components/ui/button";
import useCartStore from "@/features/cart/store";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api";

type OrderPayLoad = OrderInformationType & {
  orderItems: {
    productId: string;
    quantity: number;
  }[];
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  //to check if user come to checkout page by clicking Buy Now btn from product detail or product card
  // if buyNowProductId does not exist ,it describe user come from cart sidebar's BuyNow btn
  const buyNowProductId = searchParams.get("buynow");
  const buyNowQuantity = searchParams.get("quantity");

  const validQuantity =
    buyNowQuantity && parseInt(buyNowQuantity) > 0
      ? parseInt(buyNowQuantity)
      : 1;

  const cartItems = useCartStore((state) => state.cartItems);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<OrderInformationType>({
    resolver: zodResolver(OrderInformation),
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      address: "",
      city: "",
      township: "",
      note: "",
      payment: "cod",
    },
  });

  const { mutate, isPending } = useMutation<any, Error, OrderPayLoad>({
    mutationFn: (data) => createOrder(data),
    onSuccess: () => {
      if (!buyNowProductId) {
        clearCart();
      }

      alert("success");
      navigate("/");
    },
  });

  function onSubmit(data: OrderInformationType) {
    const preparedCartItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const orderItems = buyNowProductId
      ? [{ productId: buyNowProductId, quantity: validQuantity }]
      : preparedCartItems;

    mutate({ ...data, orderItems });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Shipping & Billing Information */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Your contact details for order updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  {...register("email")}
                />
                <FieldError>{errors?.email?.message}</FieldError>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>

                  <Input
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName")}
                  />
                  <FieldError>{errors?.fullName?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>Phone No.</FieldLabel>

                  <Input
                    type="tel"
                    placeholder="09 123456"
                    {...register("phone")}
                  />
                  <FieldError>{errors?.phone?.message}</FieldError>
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
              <CardDescription>
                Specify where you want your order delivered.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel>Address</FieldLabel>

                <Input type="text" placeholder="" {...register("address")} />
                <FieldError>{errors?.address?.message}</FieldError>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>City</FieldLabel>

                  <Input type="text" placeholder="" {...register("city")} />
                  <FieldError>{errors?.city?.message}</FieldError>
                </Field>
                <Field>
                  <FieldLabel>Township</FieldLabel>
                  <Input type="text" placeholder="" {...register("township")} />
                  <FieldError>{errors?.township?.message}</FieldError>
                </Field>
              </div>

              <Field>
                <FieldLabel>Delivery Note (optional)</FieldLabel>
                <Input type="text" placeholder="" {...register("note")} />
                <FieldError>{errors?.note?.message}</FieldError>
              </Field>
            </CardContent>
          </Card>
        </div>

        {/* Payment & Order Summary Side */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Select how you would like to pay.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="payment"
                control={control}
                render={({ field, fieldState }) => (
                  <RadioGroup
                    defaultValue={field.value}
                    className="max-w-sm"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <FieldLabel htmlFor="cod-plan">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>COD</FieldTitle>
                          <FieldDescription>Cash On Delivery</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="cod" id="cod-plan" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="online-plan">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Online</FieldTitle>
                          <FieldDescription>Online Payment</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="online" id="online-plan" />
                        <FieldError>{errors?.payment?.message}</FieldError>
                      </Field>
                    </FieldLabel>
                    <FieldError>{fieldState?.error?.message}</FieldError>
                  </RadioGroup>
                )}
              />
            </CardContent>
          </Card>

          {buyNowProductId ? (
            <BuyNowCheckOut
              productId={buyNowProductId}
              register={register}
              quantity={validQuantity}
            />
          ) : (
            <CartCheckOut />
          )}
          <Button
            variant="default"
            className="w-full"
            type="submit"
            disabled={isPending}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
