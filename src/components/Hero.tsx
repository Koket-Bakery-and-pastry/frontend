import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-[#F8EFFA]   flex flex-col items-center text-center section-spacing ">
      <h1 className="font-kaushan text-4xl md:text-5xl lg:text-7xl 2xl:text-8xl text-black  md:mb-4 leading-tight">
        Delicious Cakes for <br /> Every Celebration
      </h1>
      <p className="text-sm md:text-base lg:text-lg 2xl:text-2xl text-gray-700 max-w-5xl mx-auto mt-8 mb-14 leading-relaxed">
        From birthdays to weddings, we create custom cakes that taste as amazing
        as they look. Order online and make your special moments sweeter.
      </p>
      <div className="flex flex- gap-4 justify-center">
        <Link
          href="/products"
          className="bg-[#C967AC] hover:bg-[#ae5d95] text-white font-bold px-4 text-xs md:text-base md:px-6 py-2 rounded-full shadow-md transition"
        >
          Browse Products
        </Link>
        <Link
          href="/custom-cake"
          className="bg-white text-black font-semibold px-4 text-xs xs:text-sm md:text-base md:px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Custom Order
        </Link>
      </div>
    </section>
  );
}

export default Hero;
