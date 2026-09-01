import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { categoriesQuery, infiniteProductListQuery } from "../api";
import { CategoriesFilter } from "../components/categories-filter";
import { ProductCard } from "../components/product-card";
import { Button } from "@/components/ui/button";

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const categoryIds = categories?.data.map((c) => c.id);

  const categoriesParam = searchParams.get("categories") || null;

  const selectedCategories = categoriesParam
    ? [
        ...new Set(
          decodeURIComponent(categoriesParam)
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => !!cat && categoryIds?.includes(cat)),
        ),
      ]
    : [];
  const categoriesString =
    selectedCategories.length > 0 ? selectedCategories.join(",") : null;

  const {
    data: products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(infiniteProductListQuery(categoriesString));
  const allProducts = products?.pages.flatMap((page) => page.data) || [];

  const handleCategoriesChange = (categories: string[]) => {
    const newSearchParams = new URLSearchParams();
    if (categories.length > 0)
      newSearchParams.set("categories", categories.join(","));
    setSearchParams(newSearchParams);
    return;
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 md:gap-15 lg:gap-20 px-5 md:px-10 lg:px-20">
      <div className="pt-5">
        <CategoriesFilter
          categories={categories.data}
          handleCategoriesChange={handleCategoriesChange}
          selectedCategories={selectedCategories}
        />
      </div>
      <div className="lg:p-5">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
          {allProducts.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>

        <div className="flex justify-center my-3">
          {hasNextPage ? (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage || !hasNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          ) : (
            <span>No more articles</span>
          )}
        </div>
      </div>
    </div>
  );
}
