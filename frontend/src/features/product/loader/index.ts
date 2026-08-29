import { queryClient } from "@/api/query";
import { categoriesQuery, productDetailQuery, productListQuery } from "../api";

export async function productDetailLoader({
  params,
}: {
  params: { id: string };
}) {
  await queryClient.ensureQueryData(productDetailQuery(params.id));
}

export async function productListLoader() {
  await queryClient.ensureQueryData(categoriesQuery());
  await queryClient.ensureQueryData(productListQuery());
}
