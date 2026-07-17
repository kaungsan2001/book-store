import { api } from "@/api/axios";
import type { ProductDetailResponse } from "../schema";

export async function fetchProductDetail(id: string) {
  const { data } = await api.get<ProductDetailResponse>(`/products/${id}`);
  return data;
}

export const productDetailQuery = (id: string) => ({
  queryKey: ["products", id],
  queryFn: () => fetchProductDetail(id),
});
