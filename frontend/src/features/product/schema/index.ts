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
  data: {
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
    likedBy: {
      id: string;
    }[];
    productImages: Array<{
      id: string;
      imageUrl: string;
      imageId: string;
    }>;
  };
};

export type ProductListResponse = {
  data: Product[];
  meta: {
    totalCount: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
};

export type Category = {
  id: string;
  name: string;
};

export type CategoriesResponse = {
  data: Category[];
};
