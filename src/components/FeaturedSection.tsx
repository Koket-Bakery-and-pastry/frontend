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
      <section className="section-spacing bg-background mt-8">
        <Header text="Featured Products" />
        <LoadingState
          message="Loading featured cakes…"
          fullScreen={false}
          className="h-[320px]"
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-spacing bg-background mt-8">
        <Header text="Featured Products" />
        <p className="text-center py-16 text-destructive">{error}</p>
      </section>
    );
  }

  return (
    <section className=" section-spacing bg-background mt-8">
      <div className=" 2xl:pb-16 w-full">
        <Header text="Featured Products" />
      </div>

      <div className=" 2xl:my-16 grid grid-cols-1 sm:grid-cols-2  2xl:grid-cols-3 gap-6 3xl:gap-10 ">
        {visibleProducts.map((product, index) => (
          <div
            className={`${
              index === 1 || index === 4 ? "2xl:-mt-28" : " "
            } sm:mx-auto `}
            key={product._id}
          >
            <ProductCard
              key={product._id}
              image={
                product.image_url
                  ? `${ASSET_BASE_URL}${product.image_url}`
                  : "/assets/img1.png"
              }
              name={product.name}
              description={product.description ?? "Freshly baked with love."}
              price={
                product.price
                  ? `$${product.price}`
                  : product.is_pieceable
                  ? "Per Piece"
                  : "By Kilo"
              }
              productId={product._id}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mb-16 py-6">
        <Link href="/products" className="2xl:-mt-20 cursor-pointer">
          <Button
            variant="default"
            className=" py-3 md:py-6  lg:px-10 lg:text-lg "
          >
            View All Featured Products
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedSection;
