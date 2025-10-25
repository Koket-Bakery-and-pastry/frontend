export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Canceled";

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  kilo: number;
  message?: string;
};

export type Order = {
  id: string;
  customer: string;
  date: string;
  deliveryDate: string;
  deliveryLocation: string;
  contact: string;
  status: OrderStatus;
  products: Product[];
};

export const statusColors: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  "In Progress": "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Canceled: "bg-red-100 text-red-700",
};
