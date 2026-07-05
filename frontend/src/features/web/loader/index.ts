import { queryClient } from "@/api/query";
import { articlesQuery } from "@/features/web/api";

export const homeLoader = async () => {
  await queryClient.ensureQueryData(articlesQuery("?limit=6"));
};
