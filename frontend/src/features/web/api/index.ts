import { api } from "@/api/axios";
import type { ArticlesResponse } from "../schema";

const fetchArticles = async (q?: string): Promise<ArticlesResponse> => {
  const { data } = await api.get<ArticlesResponse>(`/articles${q ?? ""}`);
  return data;
};

export const articlesQuery = (q?: string) => ({
  queryKey: ["articles", q],
  queryFn: () => fetchArticles(q),
});
