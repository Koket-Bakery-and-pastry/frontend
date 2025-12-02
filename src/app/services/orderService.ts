import { apiClient } from "./api";
import type { ProductSummary } from "@/app/types/product";

// Order Item DTO for creating orders
export interface OrderItemDTO {
  product_id?: string;
  kilo?: number;
  pieces?: number;
  quantity: number;
  custom_text?: string;
  additional_description?: string;
}

// Order Item with populated product data (from API response)
export interface OrderItemResponse {
  _id: string;
  product_id?: string;
  product?: ProductSummary;
  kilo?: number;
  pieces?: number;
  quantity: number;
  custom_text?: string;
  additional_description?: string;
}

// Order status type based on backend
export type OrderStatus = "pending" | "accepted" | "rejected" | "completed";

// Order response from API
export interface Order {
  _id: string;
  order_items: OrderItemResponse[];
  user_id: string;
  phone_number: string;
  total_price: number;
  upfront_paid: number;
  payment_proof_url: string;
  delivery_time: string;
  status: OrderStatus;
  rejection_comment?: string;
  created_at: string;
  updated_at: string;
  // Populated fields
  order_items_details?: any[];
  user_details?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
}

// Create order payload
export interface CreateOrderPayload {
  order_items: OrderItemDTO[];
  phone_number: string;
  delivery_time: string;
  upfront_paid?: number;
  total_price?: number;
  payment_proof_file?: File;
}

// Update order payload
export interface UpdateOrderPayload {
  status?: OrderStatus;
  rejection_comment?: string;
  upfront_paid?: number;
  total_price?: number;
}

/**
 * Get all orders (Admin only)
 */
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await apiClient.get("/orders");
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch all orders:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

/**
 * Get orders for current user
 */
export const getUserOrders = async (): Promise<Order[]> => {
  try {
    const response = await apiClient.get("/orders/user");
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch user orders:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch order:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch order");
  }
};

/**
 * Create a new order with payment proof file
 */
export const createOrder = async (
  payload: CreateOrderPayload
): Promise<Order> => {
  try {
    const formData = new FormData();

    // Add order items as JSON string
    formData.append("order_items", JSON.stringify(payload.order_items));

    // Add other fields
    formData.append("phone_number", payload.phone_number);
    formData.append("delivery_time", payload.delivery_time);

    if (payload.upfront_paid !== undefined) {
      formData.append("upfront_paid", payload.upfront_paid.toString());
    }
    if (payload.total_price !== undefined) {
      formData.append("total_price", payload.total_price.toString());
    }

    // Add payment proof file
    if (payload.payment_proof_file) {
      formData.append("payment_proof_file", payload.payment_proof_file);
    }

    const response = await apiClient.post("/orders", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to create order:", error);
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

/**
 * Update order status (Admin only)
 */
export const updateOrder = async (
  id: string,
  payload: UpdateOrderPayload
): Promise<Order> => {
  try {
    const response = await apiClient.put(`/orders/${id}`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Failed to update order:", error);
    throw new Error(error.response?.data?.message || "Failed to update order");
  }
};

/**
 * Filter orders by status (Admin only)
 */
export const filterOrdersByStatus = async (
  status: OrderStatus
): Promise<Order[]> => {
  try {
    const response = await apiClient.get("/orders/filter/status", {
      params: { status },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to filter orders:", error);
    throw new Error(error.response?.data?.message || "Failed to filter orders");
  }
};

// Status colors for UI
export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-green-100 text-green-700",
};

// Status labels for display
export const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  completed: "Completed",
};
