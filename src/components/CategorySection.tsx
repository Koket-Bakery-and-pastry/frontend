import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const categories = [
  {
    name: "Cookies",
    image: "/assets/img1.png",
    tagline: "One bite, endless smiles!",
  },
  {
    name: "Cakes",
    image: "/assets/img1.png",
    tagline: "Celebrate every moment with sweetness!",
  },
  {
    name: "Breads",
    image: "/assets/img1.png",
    tagline: "Warm, fresh, and made with love!",
  },
];

function CategorySection() {
  return (
    <section className="py-16 px-4 md:py-20 bg-pink-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section heading */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl  text-center mb-16 text-balance font-kaushan">
          Shop by Category
        </h2>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col group cursor-pointer overflow-hidden transition-transform hover:scale-[1.02] "
            >
              <Card key={index} className=" shadow-none border-none pt-0">
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 "
                  />
                </div>

                {/* Category name */}
                <h3 className="text-2xl md:text-3xl font-bold text-center pb-8 text-foreground">
                  {category.name}
                </h3>

                {/* Tagline box */}
              </Card>
              <div className="rounded-lg p-6 text-center -mt-8 max-w-[300px] bg-[#E8BEDB] mx-auto">
                <p className="text-base md:text-xl font-semibold text-secondary-foreground leading-relaxed">
                  {category.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
