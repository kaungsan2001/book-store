export type Article = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  imageId: string;
  createdAt: Date;
  updatedAt: Date;
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

export type ArticlesResponse = {
  data: Article[];
  meta: {
    totalCount: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
};
