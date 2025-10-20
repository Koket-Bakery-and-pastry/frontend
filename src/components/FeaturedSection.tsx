"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

function FeaturedSection() {
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
    <section className=" section-spacing bg-pink-50 mt-8">
      <div className="pb-16 w-full">
        <h1 className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center mb-16 text-balance font-kaushan">
          Featured Products
        </h1>
      </div>

      <div className=" 2xl:my-16 grid grid-cols-2  2xl:grid-cols-3 gap-6 3xl:gap-10 ">
        {products.map((product, index) => (
          <div
            className={`${
              index === 1 || index === 4 ? "2xl:-mt-28" : " "
            } mx-auto`}
            key={product.id}
          >
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
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mb-16 py-6">
        <Button className="py-6 bg-[#C967AC] hover:bg-[#C967AC] lg:px-10 lg:text-lg 2xl:-mt-20">
          View All Featured Products
        </Button>
      </div>
    </section>
  );
}

export default FeaturedSection;
