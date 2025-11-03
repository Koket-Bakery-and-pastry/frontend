import { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  indexOfFirstProduct: number;
  onEdit: (id: string) => void;
  onDelete: (index: number, productId: string) => void;
}

export default function ProductsGrid({
  products,
  indexOfFirstProduct,
  onEdit,
  onDelete,
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        No products found. Add a product to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, idx) => {
        const globalIndex = indexOfFirstProduct + idx;
        return (
          <div
            key={`${product._id}-${globalIndex}`}
            className="relative transform hover:-translate-y-1 transition-all duration-150 p-1 sm:p-2"
          >
            <ProductCard
              product={product}
              onView={() => {
                // Implement view functionality if needed
                console.log("View product:", product._id);
              }}
              onEdit={() => onEdit(product._id)}
              onDelete={() => onDelete(idx, product._id)}
            />
          </div>
        );
      })}
    </div>
  );
}
