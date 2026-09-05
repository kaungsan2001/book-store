export type Order = {
  id: string;
  userId: string;
  orderCode: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  township: string;
  note: string | undefined;
  payment: string;
  totalPrice: number;
  status: string;
  orderItems: {
    id: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    price: number;
    product: {
      id: string;
      name: string;
    };
  }[];
  createdAt: string;
};

export type OrderListResponse = {
  data: Order[];
  meta: {
    nextCursor: string;
    hasNextPage: boolean;
    totalCount: number;
  };
};
