import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-pink-50   flex flex-col items-center text-center section-spacing ">
      <h1 className="font-kaushan text-4xl xs:text-6xl sm:text-7xl lg:text-8xl text-black  md:mb-4 leading-tight">
        Delicious Cakes for <br /> Every Celebration
      </h1>
      <p className="text-sm sm:text-lg md:text-2xl text-gray-700 max-w-5xl mx-auto mt-8 mb-14 leading-relaxed">
        From birthdays to weddings, we create custom cakes that taste as amazing
        as they look. Order online and make your special moments sweeter.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/products"
          className="bg-[#C967AC] hover:bg-[#ae5d95] text-white font-bold px-4 text-sm sm:text-base sm:px-6 py-2 rounded-full shadow-md transition"
        >
          Browse Products
        </Link>
        <Link
          href="/custom-cake"
          className="bg-white text-black font-semibold px-4 text-sm sm:text-base sm:px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Custom Order
        </Link>
      </div>
    </section>
  );
}

export default Hero;
