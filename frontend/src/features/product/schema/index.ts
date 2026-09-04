import { z } from "zod";
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

// export const OrderInformation = z.object({
//   email: z.email(),
//   fullName: z.string(),
//   phone: z.string(),
//   address: z.string(),
//   city: z.string(),
//   township: z.string(),
//   notes: z.string().optional(),
//   payment: z.string(),
// });
// export type OrderInformationType = z.infer<typeof OrderInformation>;

export const OrderInformation = z.object({
  email: z.email("Please enter a valid email"),
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(3, "Phone number is required")
    .max(15, "Phone number is too long"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  township: z.string().min(1, "Township is required"),
  note: z.string().optional(),
  payment: z.string().min(1, "Please select a payment method"),
});

export type OrderInformationType = z.infer<typeof OrderInformation>;
