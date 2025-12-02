// ...existing code...
import React from "react";
import Link from "next/link";
import Header from "./Header";

function CallToAction() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[400px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[600px] bg-center bg-cover section-spacing-y"
      style={{
        backgroundImage: "url('/assets/img5.jpg')",
      }}
    >
      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

      <div className="relative z-10 section-container">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Ready to Order Your Perfect Cake?
            </h2>
          </div>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-12 leading-relaxed font-medium">
            Browse our collection or create a custom cake designed just for you
          </p>

          <div className="flex flex-col xs:flex-row gap-4 sm:gap-5 w-full xs:w-auto">
            <Link
              href="/products"
              className="w-full xs:w-auto text-center bg-white hover:bg-white/90 text-foreground font-bold px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-sm xs:text-base md:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Shop Now
            </Link>

            <Link
              href="/custom-cake"
              className="w-full xs:w-auto text-center bg-primary hover:bg-primary-hover text-primary-foreground font-bold px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-sm xs:text-base md:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
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
