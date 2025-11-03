"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import Header from "./Header";
import Link from "next/link";
import { getProducts, Product } from "@/app/services/productService";

function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([]);
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
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-16">Loading products...</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;

  return (
    <section className=" section-spacing bg-background mt-8">
      <div className=" 2xl:pb-16 w-full">
        <Header text="Featured Products" />
      </div>

      <div className=" 2xl:my-16 grid grid-cols-1 xs:grid-cols-2  2xl:grid-cols-3 gap-6 3xl:gap-10 ">
        {products.map((product, index) => (
          <div
            className={`${
              index === 1 || index === 4 ? "2xl:-mt-28" : " "
            } mx-auto`}
            key={product.id}
          >
            <ProductCard
              key={product.id}
              image={"assets/img1.png"}
              name={"Chocolate Cake"}
              description={"Moist Carrot Cake with Cream Cheese Frosting"}
              price={product.price ? `$${product.price}` : "$0.00"}
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
