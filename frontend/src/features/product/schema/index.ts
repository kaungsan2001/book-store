export type Product = {
  id: string;
  name: string;
  author: string;
  category: {
    id: string;
    name: string;
  };
  description: string;
  price: number;
  imageUrl: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
  productImages: Array<{
    id: string;
    imageUrl: string;
    imageId: string;
  }>;
};

export type ProductDetailResponse = {
  data: Product;
};

export type ProductsResponse = {
  data: Product[];
  meta: {
    totalCount: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
};
