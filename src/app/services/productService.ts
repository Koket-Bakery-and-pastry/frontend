/**
 * Product Service
 * Handles product-related API calls
 */
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

/**
 * Get all products
 */
export async function getProducts(): Promise<ProductSummary[]> {
  try {
    const { data } = await api.get<ProductsResponse>("/products");
    return data.products;
  } catch (error: any) {
    console.error("Failed to fetch products", error?.response?.data ?? error);
    throw error;
  }
}

/**
 * Get product by ID
 */
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

/**
 * Create product review
 */
export async function createProductReview(payload: ReviewPayload) {
  try {
    const { data } = await api.post<ReviewResponse>("/reviews", payload);
    return data;
  } catch (error: any) {
    console.error("Failed to submit review", error?.response?.data ?? error);
    throw error;
  }
}
