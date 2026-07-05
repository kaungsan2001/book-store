import { api } from "@/api/axios";
import type { ArticleDetailResponse, ArticlesResponse } from "../schema";
const fetchArticles = async () => {
  const response = await api.get("/articles");
  return response.data;
};

const fetchArticleById = async (id: string): Promise<ArticleDetailResponse> => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};

export const articleDetailQuery = (id: string) => ({
  queryKey: ["article", id],
  queryFn: () => fetchArticleById(id),
});
