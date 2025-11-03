export type Product = {
  _id: string;
  name: string;
  image_url?: string;
  category_id: string;
  subcategory_id: string;
  description?: string;
  // Enriched fields from subcategory
  kilo_to_price_map?: {
    [key: string]: number;
  };
  upfront_payment?: number;
  is_pieceable?: boolean;
  price?: number;
  status?: string;
  created_at?: string;
};

export type CreateProductDto = {
  name: string;
  image_url?: string;
  category_id: string;
  subcategory_id: string;
  description?: string;
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
