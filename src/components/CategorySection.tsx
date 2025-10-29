"use client";

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
import { motion, Variants } from "framer-motion"; // ✅ import motion
import Header from "./Header";

const categories = [
  {
    name: "Cookies",
    image: "/assets/img2.png",
    tagline: "One bite, endless smiles!  love at first bite!",
  },
  {
    name: "Cakes",
    image: "/assets/img2.png",
    tagline: "Celebrate every moment with sweetness!",
  },
  {
    name: "Breads",
    image: "/assets/img2.png",
    tagline: "Warm, fresh, and made with love!",
  },
];

// ✅ Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: ["easeInOut"],
    },
  },
};

function CategorySection() {
  return (
    <section className=" bg-background mt-8 section-spacing min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center mb-16 text-balance font-kaushan"
        >
          <Header text="Explore Our Delicious Categories" />
        </motion.h2>

        {/* Category grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col group cursor-pointer overflow-hidden transition-transform px-8 md:px-0   "
            >
              <Card className="shadow-none border-none pt-0 gap-4 ">
                {/* Image container */}
                <div className="group relative aspect-square overflow-hidden rounded-lg xl:mb-3">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category name */}
                <h3 className="text-2xl lg:text-3xl font-bold text-center pb-8 text-foreground">
                  {category.name}
                </h3>
              </Card>

              {/* Tagline box */}
              <div className="flex items-center justify-center rounded-lg py-4 px-4 md:px-1 lg:px-4 text-center -mt-8 max-w-[180px] xs:max-w-[200px] sm:max-w-[220px]  2xl:max-w-[230px] 3xl:max-w-[300px] bg-primary/50 mx-auto">
                <p className="text-xs lg:text-sm 2xl:text-base 3xl:text-xl font-semibold text-secondary-foreground leading-relaxed md:max-w-[170px] xl:max-w-[250px]">
                  {category.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CategorySection;
