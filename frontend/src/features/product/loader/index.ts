import { queryClient } from "@/api/query";
import {
  categoriesQuery,
  productDetailQuery,
  productListQuery,
  infiniteProductListQuery,
} from "../api";

export async function productDetailLoader({
  params,
}: {
  params: { id: string };
}): Promise<void> {
  await queryClient.ensureQueryData(productDetailQuery(params.id));
}

export async function productListLoader(): Promise<void> {
  await queryClient.ensureQueryData(categoriesQuery());
  // await queryClient.ensureQueryData(productListQuery());
  await queryClient.prefetchInfiniteQuery(infiniteProductListQuery());
  return;
}
