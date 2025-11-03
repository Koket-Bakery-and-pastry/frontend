export type Category = {
  _id: string;
  name: string;
  description?: string;
  subcategories?: SubCategory[];
  createdAt?: string;
  updatedAt?: string;
};

export type SubCategory = {
  _id: string;
  category_id: string;
  name: string;
  status: "available" | "coming_soon";
  kilo_to_price_map?: {
    [key: string]: number;
  };
  upfront_payment: number;
  is_pieceable?: boolean;
  price?: number;
  created_at?: string;
  updatedAt?: string;
};

export type CreateCategoryDto = {
  name: string;
  description?: string;
};

export type UpdateCategoryDto = {
  name?: string;
  description?: string;
};

export type CreateSubCategoryDto = {
  category_id: string;
  name: string;
  status?: "available" | "coming_soon";
  kilo_to_price_map?: Record<string, number>;
  upfront_payment: number;
  price?: number;
  is_pieceable?: boolean;
};

export type UpdateSubCategoryDto = {
  category_id?: string;
  name?: string;
  status?: "available" | "coming_soon";
  kilo_to_price_map?: Record<string, number>;
  upfront_payment?: number;
  price?: number;
  is_pieceable?: boolean;
};
