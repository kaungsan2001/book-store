import { queryClient } from "@/api/query";
import {
  categoriesQuery,
  productDetailQuery,
  infiniteProductListQuery,
  fetchProductDetail,
} from "../api";
import type { LoaderFunctionArgs } from "react-router";

export async function productDetailLoader({ params }: LoaderFunctionArgs) {
  // return await fetchProductDetail(params.id!);
  await queryClient.ensureQueryData(productDetailQuery(params.id!));
}

export async function productListLoader(): Promise<void> {
  await queryClient.ensureQueryData(categoriesQuery());
  await queryClient.prefetchInfiniteQuery(infiniteProductListQuery());
  return;
}
