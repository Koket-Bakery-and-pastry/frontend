import React from "react";
import { FaEye } from "react-icons/fa";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  onView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  description,
  price,
  onView,
}) => {
  return (
    <div className=" rounded-2xl overflow-hidden bg-white shadow-md max-w-sm">
      <img src={image} alt={name} className="w-full h-72 object-cover" />
      <div className="p-5">
        <h3 className="font-bold text-2xl mb-1">{name}</h3>
        <p className="text-gray-500 text-lg mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#C967AC] font-bold text-2xl">{price}</span>
          <button
            onClick={onView}
            className="flex items-center gap-2 bg-[#C967AC] hover:bg-[#ae5d95] text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            <FaEye className="text-xl" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
