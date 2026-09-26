import { z } from "zod";
export const AdminOrderListSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    limit: z.coerce.number().int().positive().catch(10),
    page: z.coerce.number().int().positive().catch(1),
    status: z
      .enum(["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED", "ALL"])
      .catch("ALL"),
    sort: z.enum(["asc", "desc"]).catch("desc"),
  }),
});
