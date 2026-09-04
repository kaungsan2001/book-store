import { z } from "zod";

export const OrderCreateSchema = z.object({
  body: z.object({
    email: z.email("Please enter a valid email"),
    fullName: z.string().min(1, "Full name is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(15, "Phone number is too long"),
    address: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    township: z.string().min(1, "Township is required"),
    note: z.string().optional(),
    payment: z.string().min(1, "Please select a payment method"),
    orderItems: z.array(
      z.object({
        productId: z.string(),
        quantity: z.coerce.number(),
      }),
    ),
  }),
});

export type OrderCreateValues = z.infer<typeof OrderCreateSchema>["body"];
