"use client";
import React from "react";
import ProductCard from "./ProductCard";

function FeaturedSection() {
  return (
    <div className=" mx-32 flex flex-row justify-center items-center gap-10 my-20">
      {/* <h1>Koket Bakery and Pastry Featured Products</h1> */}
      <ProductCard
        image="/assets/img1.png"
        name="Mocha Cake"
        description="Chocolate Drip Cake with Mocha Buttercream Frosting"
        price="$500"
        onView={() => {
          /* handle view or add to cart */
        }}
      />
      <ProductCard
        image="/assets/img2.png"
        name="Mocha Cake"
        description="Chocolate Drip Cake with Mocha Buttercream Frosting"
        price="$500"
        onView={() => {
          /* handle view or add to cart */
        }}
      />
      <ProductCard
        image="/assets/img1.png"
        name="Mocha Cake"
        description="Chocolate Drip Cake with Mocha Buttercream Frosting"
        price="$500"
        onView={() => {
          /* handle view or add to cart */
        }}
      />
      <ProductCard
        image="/assets/img1.png"
        name="Mocha Cake"
        description="Chocolate Drip Cake with Mocha Buttercream Frosting"
        price="$500"
        onView={() => {
          /* handle view or add to cart */
        }}
      />
    </div>
  );
}

export default FeaturedSection;
