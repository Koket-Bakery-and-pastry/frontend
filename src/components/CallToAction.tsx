// ...existing code...
import React from "react";
import Link from "next/link";
import Header from "./Header";

function CallToAction() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[320px] sm:min-h-[380px] md:min-h-[500px] bg-center bg-cover px-4 sm:px-8 md:px-24 mt-8"
      style={{
        backgroundImage: "url('/assets/img5.jpg')",
      }}
    >
      {/* improved overlay for better contrast on all sizes */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center lg:px-12 py-10 max-w-4xl">
        <Header text="Ready to Order Your Perfect Cake Today?" />

        <p className="text-base sm:text-lg md:text-2xl font-kaushan mb-6 leading-relaxed">
          Browse our collection or create a{" "}
          <span className="block md:inline">
            custom cake designed just for you.
          </span>
        </p>

        <div className="w-full sm:w-auto flex flex-col lg:flex-row gap-3 sm:gap-4 mt-3">
          <Link
            href="/products"
            className="w-full sm:w-auto text-center bg-[#8B90E3] hover:bg-[#7f84d8] text-white font-bold px-6 py-2 rounded-lg shadow transition"
          >
            Shop Now
          </Link>

          <Link
            href="/custom-cake"
            className="w-full sm:w-auto text-center bg-[#C967AC] hover:bg-[#b65a98] text-white font-bold px-6 py-2 rounded-lg shadow transition"
          >
            Design Custom Cake
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
// ...existing code...
