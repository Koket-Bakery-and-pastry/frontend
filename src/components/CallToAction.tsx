// ...existing code...
import React from "react";
import Link from "next/link";
import Header from "./Header";

function CallToAction() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[600px] bg-center bg-cover py-12 sm:py-16 md:py-20"
      style={{
        backgroundImage: "url('/assets/img5.jpg')",
      }}
    >
      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 w-full">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
            Ready to Order Your Perfect Cake?
          </h2>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed font-medium px-2">
            Browse our collection or create a custom cake designed just for you
          </p>

          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 w-full lg:w-auto px-4 lg:px-0">
            <Link
              href="/products"
              className="w-full xs:w-auto text-center bg-white hover:bg-white/90 text-foreground font-bold px-6 xs:px-8 lg:px-10 xl:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Shop Now
            </Link>

            <Link
              href="/custom-cake"
              className="w-full xs:w-auto text-center bg-primary hover:bg-primary-hover text-primary-foreground font-bold px-6 xs:px-8 lg:px-10 xl:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Design Custom Cake
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
// ...existing code...
