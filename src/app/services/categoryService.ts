import axios from "axios";

const API_URL = "https://backend-om79.onrender.com/api/v1/categories/";

export interface Subcategory {
  _id: string;
  name: string;
  status: string;
  is_pieceable: boolean;
  price?: number;
  kilo_to_price_map?: Record<string, number>;
}
// test
export interface Category {
  _id: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(API_URL);
    return res.data.categories;
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to load categories");
  }
};
