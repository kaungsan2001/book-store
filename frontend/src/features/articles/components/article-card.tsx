import { Button, buttonVariants } from "@/components/ui/button";
import type { Article } from "../schema";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div key={article.id} className="p-4 border-b border-zinc-850">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-50 rounded-sm object-cover"
      />
      <h2 className="text-lg font-semibold text-primary">{article.title}</h2>
      <Badge>{article.category.name}</Badge>
      <p className="text-sm text-zinc-500 mt-2">
        {article.content.substring(0, 100)}...
      </p>
      <div className="flex flex-col mt-2">
        <small>Written by {article.author.name}</small>
        <small className="text-xs text-zinc-500">{article.createdAt}</small>
      </div>

      <Link
        to={`/articles/${article.id}`}
        className={buttonVariants({
          variant: "link",
          className: "float-end mt-3",
        })}
      >
        Read More
      </Link>
    </div>
  );
}
