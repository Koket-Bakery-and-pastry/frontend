export type Customer = {
  id: number | string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  joined: string;
  totalOrders: number;
  totalSpent: number;
  role?: string;
  created_at?: string;
  updated_at?: string;
};
