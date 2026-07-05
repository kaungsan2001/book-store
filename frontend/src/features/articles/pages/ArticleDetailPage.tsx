import { Calendar, Clock, Tag, Share2, Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { articleDetailQuery } from "../api";

export default function ArticleDetailPage() {
  const id = useParams().id as string;
  const { data: article } = useSuspenseQuery(articleDetailQuery(id));
  const publishDate = new Date(article.data.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // Get initials for avatar fallback
  const authorInitials = article.data.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Split content by newlines to render paragraphs cleanly
  const paragraphs = article.data.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <main className="container max-w-3xl mx-auto px-4 pt-8">
        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="mb-4 uppercase tracking-wider text-xs px-3 py-1 font-semibold text-primary bg-primary/10"
        >
          {article.data.category.name}
        </Badge>

        {/* Article Title */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight mb-6">
          {article.data.title}
        </h1>

        {/* Author and Metadata Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b mb-8">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {article.data.author.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Author</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted mb-8 shadow-sm">
          <img
            src={article.data.imageUrl}
            alt={article.data.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-[1.01]"
            loading="eager"
          />
        </div>

        {/* Main Content Body */}
        <article className="prose prose-stone dark:prose-invert max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-6 font-normal"
            >
              {paragraph}
            </p>
          ))}
        </article>

        <Separator className="my-8" />

        {/* Tags Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.data.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 text-sm font-normal rounded-md hover:bg-secondary cursor-pointer transition-colors"
              >
                #{tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
