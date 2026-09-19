import { queryClient } from "@/api/query";
import { articleDetailQuery, articlesInfiniteQuery } from "../api";
import type { LoaderFunctionArgs } from "react-router";

export const articlesInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(articlesInfiniteQuery());
  return null;
};

export const articleDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Error("Article ID is required");
  }
  await queryClient.ensureQueryData(articleDetailQuery(id));
  return { id };
};
