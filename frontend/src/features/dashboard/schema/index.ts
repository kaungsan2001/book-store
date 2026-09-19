export type DashboardOverviewResponse = {
  data: {
    products: {
      total: number;
      lowStockCount: number;
    };
    orders: {
      total: number;
      pendingCount: number;
    };
    users: {
      total: number;
    };
    financials: {
      revenue: number;
    };
  };
};

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  totalPrice: number;
  productId: string;
  product: {
    id: string;
    name: string;
  };
}
export interface Order {
  id: string;
  userId: string;
  orderCode: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  township: string;
  note?: string | null;
  payment: string;
  totalPrice: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export type AdminOrderListResponse = {
  data: Order[];
  meta: {
    totalPages: number;
    totalCount: number;
    currentPage: number;
    limit: number;
  };
};
