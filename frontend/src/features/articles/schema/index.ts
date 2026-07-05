export type Article = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
  category: {
    name: string;
  };
  tags: Array<{
    name: string;
  }>;
};

export type ArticleDetailResponse = {
  data: Article;
};

export type ArticlesResponse = {
  data: Article[];
  meta: {
    totalCount: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
};
