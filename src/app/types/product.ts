export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  subCategory: string;
  image: string;
  featured: boolean;
  inStock: boolean;
};

export type ProductCardProps = {
  product: Product;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};
