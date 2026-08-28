import { queryClient } from "@/api/query";
import { articlesInfiniteQuery } from "../api";

export const articlesInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(articlesInfiniteQuery());
  return null;
};
