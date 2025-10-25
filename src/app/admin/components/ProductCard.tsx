import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  inStock?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  description,
  price,
  inStock = true,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md max-w-sm">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-72 object-cover" />
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
        <h3 className="font-bold text-2xl mb-1">{name}</h3>
        <p className="text-gray-500 text-lg mb-4 line-clamp-1">{description}</p>

        <div className="flex items-center justify-between gap-4">
          <span className="text-[#c967ac] font-bold text-2xl">{price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
              aria-label="Edit product"
              title="Edit"
            >
              <FaEdit size={30} title="Edit" color="#07753e" />
            </button>

            <button
              onClick={onDelete}
              className="p-2 rounded-lg hover:bg-gray-100 text-red-600 transition"
              aria-label="Delete product"
              title="Delete"
            >
              <FaTrash size={30} title="Delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
