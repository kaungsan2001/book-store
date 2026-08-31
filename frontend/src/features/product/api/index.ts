import { api } from "@/api/axios";
import { keepPreviousData } from "@tanstack/react-query";

import type {
  ProductDetailResponse,
  CategoriesResponse,
  ProductListResponse,
} from "../schema";

async function fetchProductList() {
  const { data } = await api.get<ProductListResponse>("/products");
  return data;
}

export const productListQuery = () => ({
  queryKey: ["products"],
  queryFn: fetchProductList,
});

//------------------------------------------------------------
async function fetchInfiniteProductList(categories: string | null = null) {
  const query = `?limit=10${categories ? `&categories=${categories}` : ""}`;

  const { data } = await api.get<ProductListResponse>(`/products${query}`);
  return data;
}

export const infiniteProductListQuery = (categories: string | null = null) => ({
  queryKey: ["products", "infinite", categories ?? undefined],
  queryFn: () => fetchInfiniteProductList(categories),
  placeholderData: keepPreviousData,
  initialPageParam: null,
  getNextPageParam: (lastPage: ProductListResponse) =>
    lastPage.meta.nextCursor ?? null,
});

//-------------------------------------------------------------
export async function fetchProductDetail(id: string) {
  const { data } = await api.get<ProductDetailResponse>(`/products/${id}`);
  return data;
}

export const productDetailQuery = (id: string) => ({
  queryKey: ["products", id],
  queryFn: () => fetchProductDetail(id),
});

//-------------------------------------------------------------

async function fetchCategories(): Promise<CategoriesResponse> {
  const { data } = await api.get("/categories");
  return data;
}

export const categoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});
