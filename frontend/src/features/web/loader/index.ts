import { queryClient } from "@/api/query";
import { articlesQuery, productsQuery } from "@/features/web/api";

export const homeLoader = async () => {
  await queryClient.ensureQueryData(articlesQuery("?limit=6"));
  await queryClient.ensureQueryData(productsQuery("?limit=6"));
};
