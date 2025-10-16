"use client";

import React from "react";
import { ProductFiltration, ProductHeader } from "./components";
import { ProductCard } from "@/components";

function ProductsPage() {
  const products = [
    {
      id: 1,
      image: "/assets/img1.png",
      name: "Mocha Cake",
      description: "Chocolate Drip Cake with Mocha Buttercream Frosting",
      price: "$500",
    },
    {
      id: 2,
      image: "/assets/img2.png",
      name: "Vanilla Cake",
      description: "Classic Vanilla Cake with Buttercream Frosting",
      price: "$450",
    },
    {
      id: 3,
      image: "/assets/img2.png",
      name: "Red Velvet Cake",
      description: "Rich Red Velvet Cake with Cream Cheese Frosting",
      price: "$550",
    },
    {
      id: 4,
      image: "/assets/img2.png",
      name: "Lemon Cake",
      description: "Zesty Lemon Cake with Lemon Buttercream Frosting",
      price: "$480",
    },
    {
      id: 5,
      image: "/assets/img2.png",
      name: "Carrot Cake",
      description: "Moist Carrot Cake with Cream Cheese Frosting",
      price: "$520",
    },
    {
      id: 6,
      image: "/assets/img2.png",
      name: "Chocolate Cake",
      description: "Decadent Chocolate Cake with Chocolate Ganache",
      price: "$600",
    },
  ];
  return (
    <div className="bg-[#FFFAFF] ">
      <ProductHeader />
      <ProductFiltration />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-10 section-spacing bg-[#FFFAFF]  ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
            onView={() => {
              /* handle view or add to cart */
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
