import { api } from "@/api/axios";
import type { ArticlesResponse } from "../schema";
import type { ProductsResponse } from "@/features/product/schema";

const fetchArticles = async (q?: string): Promise<ArticlesResponse> => {
  const { data } = await api.get<ArticlesResponse>(`/articles${q ?? ""}`);
  return data;
};

export const articlesQuery = (q?: string) => ({
  queryKey: ["articles", q],
  queryFn: () => fetchArticles(q),
});

const fetchProducts = async (q?: string): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>(`/products${q ?? ""}`);
  return data;
};

export const productsQuery = (q?: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchProducts(q),
});
