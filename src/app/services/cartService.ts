import type { ProductSummary } from "@/app/types/product";
import { apiClient as api } from "./api";

export interface AddToCartPayload {
  product_id: string;
  quantity?: number; // Always 1, but optional in case we want to override
  kilo?: number; // Optional - for weight-based products
  custom_text?: string; // Optional - message on cake
  additional_description?: string; // Optional - delivery notes, allergies, etc.
}

interface CartMutationResponse {
  message?: string;
}

export interface CartItem {
  _id: string;
  user_id: string;
  product_id: string | ProductSummary;
  kilo?: number;
  pieces?: number;
  quantity: number;
  custom_text?: string;
  additional_description?: string;
  created_at?: string;
  __v?: number;
}

/**
 * Add item to cart (order items)
 */
export async function addToCart(payload: AddToCartPayload) {
  try {
    // Get auth token from localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Please login to add items to cart");
    }

    // Ensure quantity is always 1
    const requestPayload = {
      ...payload,
      quantity: 1,
    };

    const { data } = await api.post<CartMutationResponse>(
      "/orders/items",
      requestPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Failed to add item to cart", error?.response?.data ?? error);
    throw error;
  }
}

/**
 * Get all cart items for the current user
 */
export async function getCartItems(): Promise<CartItem[]> {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return [];
    }

    const { data } = await api.get<CartItem[]>("/orders/items/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // API returns array directly, not wrapped in an object
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error("Failed to fetch cart items", error?.response?.data ?? error);
    throw error;
  }
}

/**
 * Update cart item quantity or details
 */
export async function updateCartItem(
  itemId: string,
  updates: Partial<AddToCartPayload>
) {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Please login to update cart");
    }

    const { data } = await api.put<CartMutationResponse>(
      `/orders/items/${itemId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Failed to update cart item", error?.response?.data ?? error);
    throw error;
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemId: string) {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Please login to remove items from cart");
    }

    const { data } = await api.delete<CartMutationResponse>(
      `/orders/items/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Failed to remove cart item", error?.response?.data ?? error);
    throw error;
  }
}

/**
 * Clear all cart items
 */
export async function clearCart() {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Please login to clear cart");
    }

    const { data } = await api.delete<CartMutationResponse>("/orders/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Failed to clear cart", error?.response?.data ?? error);
    throw error;
  }
}
