import { api } from "@/api/axios";
import type {
  ProductDetailResponse,
  CategoriesResponse,
  ProductsResponse,
} from "../schema";

async function fetchProductList() {
  const { data } = await api.get<ProductsResponse>("/products");
  return data;
}

export const productListQuery = () => ({
  queryKey: ["products"],
  queryFn: fetchProductList,
});

export async function fetchProductDetail(id: string) {
  const { data } = await api.get<ProductDetailResponse>(`/products/${id}`);
  return data;
}

export const productDetailQuery = (id: string) => ({
  queryKey: ["products", id],
  queryFn: () => fetchProductDetail(id),
});

async function fetchCategories(): Promise<CategoriesResponse> {
  const { data } = await api.get("/categories");
  return data;
}

export const categoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});
