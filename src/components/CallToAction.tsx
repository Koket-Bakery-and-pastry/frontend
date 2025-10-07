import React from "react";
import Link from "next/link";

function CallToAction() {
  return (
    <section
      className="relative flex items-center   min-h-[350px] md:min-h-[500px] bg-center bg-cover px-24 mt-8"
      style={{
        backgroundImage: "url('/assets/img5.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-24 py-12 ">
        <h2 className="text-4xl md:text-5xl font-kaushan mb-8 mt-6">
          Ready to Order Your Perfect Cake?
        </h2>
        <p className="text-2xl md:text-3xl font-kaushan mb-8 leading-normal">
          Browse our collection or create a <br className="hidden md:block" />
          custom cake designed just for you.
        </p>
        <div className="flex gap-4 mt-3">
          <Link
            href="/products"
            className="bg-[#A3A9E0] hover:bg-[#A3A9E0] text-white font-bold px-6 py-2 rounded-lg shadow transition"
          >
            Shop Now
          </Link>
          <Link
            href="/custom-cake"
            className="bg-[#C967AC] hover:bg-[#C967AC] text-white font-bold px-6 py-2 rounded-lg shadow transition"
          >
            Design Custom Cake
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
