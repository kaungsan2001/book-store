import { queryClient } from "@/api/query";
import { productDetailQuery } from "../api";

export async function productDetailLoader({
  params,
}: {
  params: { id: string };
}) {
  await queryClient.ensureQueryData(productDetailQuery(params.id));
}
