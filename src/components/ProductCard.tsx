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
    // full width so grid controls columns; no fixed max width
    <div className="w-full h-full">
      <div className="rounded-2xl overflow-hidden bg-white shadow-md  flex flex-col max-w-sm">
        <div className="overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-40 lg:h-72 object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-bold text-sm lg:text-lg 2xl:text-2xl line-clamp-1 mb-1">
            {name}
          </h3>

          <p className="text-gray-500 text-xs lg:text-base 2xl:text-lg mb-3 line-clamp-1">
            {description}
          </p>

          <div className="mt-auto md:pb-2 lg:pb-5 flex  items-center justify-between gap-2">
            <span className="text-[#C967AC] font-bold text-sm lg:text-2xl">
              {price}
            </span>

            <button
              onClick={onView}
              className="flex items-center gap-2 bg-[#C967AC] hover:bg-[#ae5d95] text-white font-semibold px-3 py-1.5 lg:px-6 lg:py-2 rounded-lg transition text-xs"
            >
              <FaEye className="text-xs lg:text-xl" />
              <span className="text-xs lg:text-base">View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
