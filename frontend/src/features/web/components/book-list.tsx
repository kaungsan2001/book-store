import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/features/web/api";
import { Link } from "react-router";
import { ProductCard } from "@/features/product/components/product-card";

export default function BookList() {
  const { data } = useSuspenseQuery(productsQuery("?limit=6"));

  return (
    <section className="p-4">
      <h1 className="text-center text-2xl font-bold text-primary my-3">
        Latest Books
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-4">
        <Link to="/products" className="text-primary underline italic">
          View All
        </Link>
      </div>
    </section>
  );
}
