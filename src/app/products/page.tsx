"use client";
import React, { useMemo, useState } from "react";
import { ProductHeader, ProductFiltration } from "./components";
import { ProductCard } from "@/components";
import { ProductFilters, Category } from "../types/ProductFilters";

const allProducts = [
  {
    id: 1,
    image: "/assets/img1.png",
    name: "Chocolate Cake",
    description: "Chocolate Drip Cake with Mocha Frosting",
    price: 500,
    category: "Cake",
    subcategory: "Chocolate cakes",
  },
  {
    id: 2,
    image: "/assets/img2.png",
    name: "Red Velvet Cake",
    description: "Rich Red Velvet Cake with Cream Cheese Frosting",
    price: 550,
    category: "Cake",
    subcategory: "Red velvet cakes",
  },
  {
    id: 3,
    image: "/assets/img2.png",
    name: "Banana Bread",
    description: "Moist banana bread with vanilla flavor",
    price: 300,
    category: "Quick Bread",
    subcategory: "Banana bread",
  },
  {
    id: 4,
    image: "/assets/img2.png",
    name: "Chocolate Cookies",
    description: "Crispy chocolate cookies, half a kilo for 250 birr",
    price: 250,
    category: "Cookies",
    subcategory: "½kg - 250 birr",
  },
  {
    id: 5,
    image: "/assets/img2.png",
    name: "Muffin Pack",
    description: "Freshly baked vanilla muffins",
    price: 280,
    category: "Quick Bread",
    subcategory: "Muffin",
  },
  {
    id: 6,
    image: "/assets/img2.png",
    name: "Caramel Cake",
    description: "Soft caramel cake with buttery frosting",
    price: 520,
    category: "Cake",
    subcategory: "Caramel cakes",
  },
];

function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    category: "All Products",
    subcategory: "All Products",
    search: "",
    sort: "name",
  });

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by category
    if (filters.category !== "All Products") {
      products = products.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by subcategory
    if (
      filters.subcategory &&
      filters.subcategory !== "All Products" &&
      !filters.subcategory.startsWith("All ")
    ) {
      products = products.filter(
        (p) =>
          p.subcategory?.toLowerCase() === filters.subcategory.toLowerCase()
      );
    }

    // Search
    if (filters.search.trim() !== "") {
      const q = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (filters.sort === "priceAsc") {
      products.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "priceDesc") {
      products.sort((a, b) => b.price - a.price);
    } else {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }, [filters]);

  return (
    <div className="bg-[#FFFAFF] min-h-screen">
      <ProductHeader />

      <ProductFiltration filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 section-spacing bg-[#FFFAFF] px-4 sm:px-8 md:px-12 lg:px-16">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={`$${product.price}`}
              onView={() => {}}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found 😕
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
