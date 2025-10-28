import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  description,
  price,
  productId,
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

        <div className="p-2 md:p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-sm lg:text-lg 2xl:text-2xl line-clamp-1 mb-1">
            {name}
          </h3>

          <p className="text-foreground text-xs lg:text-base 2xl:text-lg mb-3 line-clamp-1">
            {description}
          </p>

          <div className="mt-auto lg:pt-4 md:pb-2 lg:pb-5 flex  items-center justify-between gap-2">
            <span className="text-primary font-bold text-sm lg:text-2xl">
              {price}
            </span>

            <Link href={`/products/${productId}`} passHref>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-3 py-1.5 lg:px-6 lg:py-2 rounded-lg transition text-xs">
                <FaEye className="text-xs lg:text-xl" />
                <span className="text-xs lg:text-base">View</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
