import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesQuery, productListQuery } from "../api";
import { CategoriesFilter } from "../components/categories-filter";
import { ProductCard } from "../components/product-card";

export default function ProductListPage() {
  const { data } = useSuspenseQuery(categoriesQuery());
  const { data: products } = useSuspenseQuery(productListQuery());

  return (
    <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 md:gap-15 lg:gap-20 px-5 md:px-10 lg:px-20">
      <div className="pt-5">
        <CategoriesFilter categories={data.data} />
      </div>
      <div className="lg:p-5">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
          {products.data.map((p) => (
            <ProductCard product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
