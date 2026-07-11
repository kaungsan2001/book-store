export type Product = {
  id: string;
  name: string;
  author: string;
  category: string;
  productImages: Array<{
    imageUrl: string;
  }>;
  description: string;
  price: number;
  imageUrl: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductsResponse = {
  data: Product[];
  meta: {
    totalCount: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
};
