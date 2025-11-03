// services/productService.ts
import axios from "axios";

const API_URL = "https://backend-om79.onrender.com/api/v1/products";

export interface Product {
  _id: string;
  name: string;
  image_url?: string;
  description: string;
  price?: string; // optional, depending on your backend
  is_pieceable: boolean;
  [key: string]: any;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products;
  } catch (err: any) {
    console.error("Failed to fetch products:", err.response?.data || err.message);
    throw err;
  }
};
