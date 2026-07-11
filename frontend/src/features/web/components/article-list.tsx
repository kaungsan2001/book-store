import ArticleCard from "@/features/articles/components/article-card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { articlesQuery } from "@/features/web/api";
import { Link } from "react-router";

export default function ArticleList() {
  const { data: articles } = useSuspenseQuery(articlesQuery("?limit=6"));
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold text-primary text-center my-3">
        Latest Articles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.data.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <Link to="/articles" className="text-primary underline italic">
          View All
        </Link>
      </div>
    </section>
  );
}
