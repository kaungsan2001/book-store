import { api } from "@/api/axios";
import type { ArticleDetailResponse, ArticlesResponse } from "../schema";

const fetchArticleById = async (id: string): Promise<ArticleDetailResponse> => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};

export const articleDetailQuery = (id: string) => ({
  queryKey: ["article", id],
  queryFn: () => fetchArticleById(id),
});

const fetchInfiniteArticles = async ({
  pageParam = null,
}): Promise<ArticlesResponse> => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const response = await api.get(`/articles${query}`);
  return response.data;
};

export const articlesInfiniteQuery = () => ({
  queryKey: ["articles", "infinite"],
  queryFn: fetchInfiniteArticles,
  initialPageParam: null,
  getNextPageParam: (lastPage: any) => lastPage.meta.nextCursor || undefined,
});
