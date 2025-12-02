import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-background    flex flex-col items-center text-center section-spacing-y section-container ">
      <h1 className=" font-kaushan text-4xl md:text-5xl lg:text-7xl 2xl:text-8xl text-foreground  md:mb-4 leading-tight">
        Delicious Cakes for <br /> Every Celebration
      </h1>
      <p className="text-sm md:text-base lg:text-lg 2xl:text-2xl text-foreground max-w-5xl mx-auto mt-8 mb-14 leading-relaxed">
        From birthdays to weddings, we create custom cakes that taste as amazing
        as they look. Order online and make your special moments sweeter.
      </p>
      <div className="flex flex- gap-4 justify-center">
        <Link
          href="/products"
          className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold px-4 text-xs md:text-base md:px-6 py-2 rounded-full shadow-md transition"
        >
          Browse Products
        </Link>
        <Link
          href="/products"
          className="bg-white text-foreground font-semibold px-4 text-xs xs:text-sm md:text-base md:px-6 py-2 rounded-full shadow-md hover:bg-foreground-hover transition"
        >
          Custom Order
        </Link>
      </div>
    </section>
  );
}

export default Hero;
