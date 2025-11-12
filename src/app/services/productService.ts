import type { ProductDetail, ProductSummary } from "@/app/types/product";
import { apiClient as api } from "./api";

interface ProductsResponse {
  message: string;
  products: ProductSummary[];
}

interface ProductResponse {
  message: string;
  product: ProductDetail;
}

interface ReviewPayload {
  product_id: string;
  user_id?: string;
  rating: number;
  comment: string;
  name?: string;
}

interface ReviewResponse {
  message: string;
}

export interface AddToCartPayload {
  product_id: string;
  quantity: number;
  kilo?: number;
  pieces?: number;
  custom_text?: string;
  additional_description?: string;
}

interface CartMutationResponse {
  message?: string;
}

export interface CartItem {
  _id: string;
  user_id?: string;
  product_id: string | ProductSummary;
  kilo?: number;
  pieces?: number;
  quantity: number;
  custom_text?: string;
  additional_description?: string;
  created_at?: string;
}

interface CartItemsResponse {
  message?: string;
  cartItems: CartItem[];
}

export async function getProducts(): Promise<ProductSummary[]> {
  try {
    const { data } = await api.get<ProductsResponse>("/products");
    return data.products;
  } catch (error: any) {
    console.error("Failed to fetch products", error?.response?.data ?? error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<ProductDetail> {
  try {
    const { data } = await api.get<ProductResponse>(`/products/${id}`);
    return data.product;
  } catch (error: any) {
    console.error(
      `Failed to fetch product ${id}`,
      error?.response?.data ?? error
    );
    throw error;
  }
}

export async function createProductReview(payload: ReviewPayload) {
  try {
    const { data } = await api.post<ReviewResponse>("/reviews", payload);
    return data;
  } catch (error: any) {
    console.error("Failed to submit review", error?.response?.data ?? error);
    throw error;
  }
}

export async function addToCart(payload: AddToCartPayload) {
  try {
    const { data } = await api.post<CartMutationResponse>("/carts", payload);
    return data;
  } catch (error: any) {
    console.error("Failed to add item to cart", error?.response?.data ?? error);
    throw error;
  }
}

export async function getCartItems(): Promise<CartItem[]> {
  try {
    const { data } = await api.get<CartItemsResponse>("/carts");
    return data.cartItems ?? [];
  } catch (error: any) {
    console.error("Failed to fetch cart items", error?.response?.data ?? error);
    throw error;
  }
}
