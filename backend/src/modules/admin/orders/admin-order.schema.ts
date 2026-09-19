import { z } from "zod";
export const AdminOrderListSchema = z.object({
  query: z.object({
    searchKey: z.string().optional(),
    limit: z.coerce.number().int().positive().catch(10),
    page: z.coerce.number().int().positive().catch(1),
    status: z
      .enum(["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED", "ALL"])
      .optional(),
  }),
});
