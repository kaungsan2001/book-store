import { useInfiniteQuery } from "@tanstack/react-query";
import { articlesInfiniteQuery } from "../api";
import ArticleCard from "@/features/articles/components/article-card";
import { Button } from "@/components/ui/button";

export default function ArticleListPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(articlesInfiniteQuery());

  const articles = data?.pages.flatMap((page) => page.data) || [];

  if (status === "error") {
    return <div>Error loading articles.</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center my-2">Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
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
  );
}
