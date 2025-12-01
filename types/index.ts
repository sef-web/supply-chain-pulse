export type UUID = string;

export interface Product {
  id: UUID;
  name: string;
  sku: string;
  category: string;
  stock_level: number;
  reorder_point: number;
  price: number;
  last_restocked?: string | null;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: UUID;
  customer_name: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

// This is the part you were likely missing:
export interface Supplier {
  id: UUID;
  name: string;
  contact_email?: string | null;
  phone?: string | null;
  address?: string | null;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}