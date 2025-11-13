import { Product } from "../../types/product";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({
  product,
  onView,
  onEdit,
  onDelete,
}: ProductCardProps) {
  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
    }).format(price);
  };

  // Get available sizes from kilo_to_price_map
  const availableSizes = product.kilo_to_price_map
    ? Object.keys(product.kilo_to_price_map)
    : [];

  // Get the image URL or use a placeholder
  const productImage = product.image_url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001"}${
        product.image_url
      }`
    : "/assets/placeholder-product.png";

  // Determine stock status based on product status
  const inStock = product.status !== "coming_soon";

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md max-w-sm hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-72 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/placeholder-product.png";
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
            aria-live="polite"
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-2xl mb-1">{product.name}</h3>
        <p className="text-gray-500 text-lg mb-4 line-clamp-2">
          {product.description || "No description available"}
        </p>

        {/* Price Information */}
        <div className="mb-4">
          {/* Base Price */}
          {product.price && product.price > 0 && (
            <p className="text-primary font-bold text-2xl mb-2">
              {formatPrice(product.price)}
            </p>
          )}

          {/* Upfront Payment */}
          {product.upfront_payment && product.upfront_payment > 0 && (
            <p className="text-sm text-gray-500">
              Upfront: {formatPrice(product.upfront_payment)}
            </p>
          )}

          {/* Available Sizes */}
          {availableSizes.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Available Sizes:
              </p>
              <div className="flex flex-wrap gap-1">
                {availableSizes.map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pieceable Indicator */}
          {product.is_pieceable && (
            <p className="text-xs text-blue-600 mt-2 font-medium">
              • Sold by pieces
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Price Display */}
          <div className="flex-1">
            {product.price && product.price > 0 ? (
              <span className="text-primary font-bold text-2xl">
                {formatPrice(product.price)}
              </span>
            ) : (
              <span className="text-gray-500 text-lg">Price not set</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onView}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
              aria-label="View product"
              title="View"
            >
              <FaEye size={24} title="View" />
            </button>

            <button
              onClick={onEdit}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
              aria-label="Edit product"
              title="Edit"
            >
              <FaEdit size={24} title="Edit" color="#07753e" />
            </button>

            <button
              onClick={onDelete}
              className="p-2 rounded-lg hover:bg-gray-100 text-red-600 transition"
              aria-label="Delete product"
              title="Delete"
            >
              <FaTrash size={24} title="Delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
