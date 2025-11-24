export type Category = {
  _id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  __v?: number;
};

export type SubCategory = {
  _id: string;
  category_id: string;
  name: string;
  status: string;
  kilo_to_price_map?: {
    [key: string]: number;
  };
  upfront_payment: number;
  is_pieceable: boolean;
  price: number;
  created_at?: string;
  updated_at?: string;
  __v?: number;
};

export type Product = {
  _id: string;
  name: string;
  image_url?: string;
  images?: string[]; // Array of image URLs
  category_id: Category | string;
  subcategory_id: SubCategory | string | null;
  description?: string;
  // Fields inherited from subcategory
  kilo_to_price_map?: {
    [key: string]: number;
  };
  upfront_payment?: number;
  is_pieceable?: boolean;
  pieces?: number; // For pieceable products
  created_at?: string;
  updated_at?: string;
  __v?: number;
};

export type CreateProductDto = {
  name: string;
  image_url?: string;
  category_id: string;
  subcategory_id: string;
  description?: string;
  is_pieceable?: boolean;
};

export type UpdateProductDto = {
  name?: string;
  image_url?: string;
  category_id?: string;
  subcategory_id?: string;
  description?: string;
};

export type ProductFilters = {
  categoryId?: string;
  subcategoryId?: string;
};

export type ProductCardProps = {
  product: Product;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};
