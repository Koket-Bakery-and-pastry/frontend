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
    <section className=" bg-pink-50 py-10 mt-8">
      <h1 className="text-center text-3xl font-bold my-32 font-kaushan  ">
        Featured Products
      </h1>

      <div className=" mx-32 my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10 ">
        {/* <h1>Koket Bakery and Pastry Featured Products</h1> */}

        {products.map((product, index) => (
          <div
            className={`${index === 1 || index === 4 ? "-mt-28" : ""} mx-auto`}
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
      <div className="flex justify-center items-center mb-16">
        <Button className="py-6 bg-[#C967AC] hover:bg-[#C967AC] px-10 text-lg -mt-20">
          View All Featured Products
        </Button>
      </div>
    </section>
  );
}

export default FeaturedSection;
