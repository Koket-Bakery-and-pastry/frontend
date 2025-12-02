"use client";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import Header from "./Header";
import Link from "next/link";
import { getProducts } from "@/app/services/productService";
import type { ProductSummary } from "@/app/types/product";
import LoadingState from "@/components/LoadingState";

const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ??
  "https://backend-om79.onrender.com";

function FeaturedSection() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        const message = "Failed to load products.";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = useMemo(() => products.slice(0, 6), [products]);

  if (loading) {
    return (
      <section className="bg-background section-spacing-y">
        <div className="section-container">
          <div className="text-center mb-10">
            <Header text="Featured Products" />
          </div>
          <LoadingState
            message="Loading featured products…"
            fullScreen={false}
            className="h-[320px]"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-background section-spacing-y">
        <div className="section-container">
          <div className="text-center mb-10">
            <Header text="Featured Products" />
          </div>
          <p className="text-center py-16 text-destructive text-base md:text-lg">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background section-spacing-y">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <Header text="Featured Products" />
          <p className="mt-3 xs:mt-4 text-muted-foreground text-sm xs:text-base md:text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of the finest baked goods
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10 mb-12 sm:mb-14 md:mb-16">
          {visibleProducts.map((product) => {
            // Determine the price to display based on product type
            let displayPrice = "Contact for Price";

            // Check if product has kilo_to_price_map (sold by weight)
            if (
              product.kilo_to_price_map &&
              Object.keys(product.kilo_to_price_map).length > 0
            ) {
              const prices = Object.values(product.kilo_to_price_map);
              const minPrice = Math.min(...prices);
              displayPrice = `From $${minPrice.toFixed(2)}`;
            }
            // Check if product is pieceable (sold per piece with subcategory price)
            else if (product.is_pieceable && product.subcategory_id?.price) {
              displayPrice = `$${product.subcategory_id.price.toFixed(2)}`;
            }

            return (
              <ProductCard
                key={product._id}
                image={
                  product.image_url
                    ? `${ASSET_BASE_URL}${product.image_url}`
                    : "/assets/img1.png"
                }
                name={product.name}
                description={product.description ?? "Freshly baked with love."}
                price={displayPrice}
                productId={product._id}
              />
            );
          })}
        </div>

        {/* View all button */}
        <div className="flex justify-center">
          <Link href="/products">
            <Button
              size="lg"
              className="text-sm xss:text-base md:text-lg font-semibold px-6 xss:px-8 md:px-12 py-5 xss:py-6 md:py-7 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
