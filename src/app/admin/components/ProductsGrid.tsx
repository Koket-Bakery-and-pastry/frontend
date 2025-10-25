import { Product } from "../../types/product";
import ProductCard from "../components/ProductCard";

interface ProductsGridProps {
  products: Product[];
  indexOfFirstProduct: number;
  onEdit: (id: number) => void;
  onDelete: (globalIndex: number) => void;
}

export default function ProductsGrid({
  products,
  indexOfFirstProduct,
  onEdit,
  onDelete,
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-10 sm:py-12 text-center text-gray-600 text-sm sm:text-base px-2">
        No products found. Add a product to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, idx) => {
        const globalIndex = indexOfFirstProduct + idx;
        return (
          <div
            key={`${product.id}-${globalIndex}`}
            className="relative transform hover:-translate-y-1 transition-all duration-150 p-1 sm:p-2 text-xl"
          >
            <ProductCard
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              onView={() => {}}
              onEdit={() => onEdit(product.id)}
              onDelete={() => onDelete(globalIndex)}
            />
          </div>
        );
      })}
    </div>
  );
}
