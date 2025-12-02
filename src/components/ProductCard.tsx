"use client";

import Link from "next/link";
import React from "react";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <motion.div
      className="w-full h-full group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card shadow-lg hover:shadow-2xl border-2 border-border hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
        {/* Image container with overlay effect */}
        <div className="relative overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content section */}
        <div className="p-4 xss:p-5 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
          <h3 className="font-bold text-base xss:text-lg sm:text-base md:text-lg lg:text-xl mb-2 line-clamp-2 text-card-foreground group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>

          <p className="text-muted-foreground text-xs xss:text-sm md:text-base mb-3 line-clamp-2 leading-relaxed flex-1">
            {description}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 flex-1 bg-primary/20 rounded-full" />
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <div className="h-0.5 flex-1 bg-primary/20 rounded-full" />
          </div>

          {/* Price and action button */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">
                Price
              </span>
              <span className="text-primary font-bold text-lg xss:text-xl sm:text-lg md:text-xl lg:text-2xl">
                {price}
              </span>
            </div>

            <Link href={`/products/${productId}`}>
              <Button className="flex items-center gap-2 font-semibold text-xs xss:text-sm whitespace-nowrap">
                <FaEye className="text-sm" />
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
