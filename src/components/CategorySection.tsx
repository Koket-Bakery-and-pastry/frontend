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

const categories = [
  {
    name: "Cookies",
    image: "/assets/img1.png",
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
    <section className=" bg-pink-50 mt-8 section-spacing ">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl xs:text-5xl md:text-6xl lg:text-7xl text-center mb-16 text-balance font-kaushan"
        >
          Shop by Category
        </motion.h2>

        {/* Category grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col group cursor-pointer overflow-hidden transition-transform px-8 xs:px-0 max-w- mx-"
            >
              <Card className="shadow-none border-none pt-0 ">
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden rounded-lg xl:mb-3 ">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 width-1/2 "
                  />
                </div>

                {/* Category name */}
                <h3 className="text-2xl lg:text-3xl font-bold text-center pb-8 text-foreground">
                  {category.name}
                </h3>
              </Card>

              {/* Tagline box */}
              <div className="rounded-lg py-4 px-4 text-center -mt-8 max-w-[200px] xl:max-w-[300px] bg-[#E8BEDB] mx-auto">
                <p className="text-sm sm:text-base xl:text-xl font-semibold text-secondary-foreground leading-relaxed md:max-w-[170px] xl:max-w-[250px]">
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
