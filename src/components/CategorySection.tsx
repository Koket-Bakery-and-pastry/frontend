"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Added Variants import
import { ChevronRight, Heart, Star } from "lucide-react"; // Assuming lucide-react for icons

const categories = [
  {
    name: "Cookies",
    image: "/assets/img1.png",
    tagline: "One bite, endless smiles!",
    icon: Heart,
    accentColor: "from-rose-400 to-pink-500",
  },
  {
    name: "Cakes",
    image: "/assets/img2.png",
    tagline: "Celebrate every moment with sweetness!",
    icon: Star,
    accentColor: "from-purple-400 to-pink-500",
  },
  {
    name: "Breads",
    image: "/assets/img3.png", // Updated to img3 for variety
    tagline: "Warm, fresh, and made with love!",
    icon: ChevronRight,
    accentColor: "from-amber-400 to-orange-500",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

function CategorySection() {
  return (
    <section className="py-20 px-4 md:py-24 bg-gradient-to-br from-pink-50 via-white to-rose-50 mt-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/assets/pattern-dots.svg')] bg-repeat"></div>{" "}
        {/* Assume a dots pattern asset */}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section heading with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge className="bg-gradient-to-r from-rose-200 to-pink-200 text-rose-800 px-4 py-1 mb-4 inline-block">
            Discover Our Delights
          </Badge>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-balance font-kaushan text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
            Shop by Category
          </h2>
          {/* <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Indulge in our handcrafted treats, baked with passion and a sprinkle
              of magic.
            </p> */}
        </motion.div>

        {/* Category grid with stagger animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const accentBase = category.accentColor
              .split("from-")[1]
              .split("-")[0];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="flex flex-col group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
              >
                {/* Image container with gradient overlay */}
                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                  {/* Icon overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                  >
                    <Icon className={`h-6 w-6 text-${accentBase}-500`} />
                  </motion.div>
                </div>

                {/* Content card */}
                <Card className="flex-1 border-none shadow-none bg-transparent">
                  <CardContent className="p-6 pt-0 flex flex-col items-center text-center">
                    {/* Category name with gradient */}
                    <h3 className="text-3xl md:text-4xl font-bold pb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 group-hover:from-gray-800 group-hover:to-gray-600 transition-colors duration-300">
                      {category.name}
                    </h3>

                    {/* Tagline with enhanced styling */}
                    <div className="relative">
                      <div
                        className={`w-full h-1 bg-gradient-to-r ${category.accentColor} rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity`}
                      ></div>
                      <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed px-4">
                        {category.tagline}
                      </p>
                    </div>
                  </CardContent>

                  {/* Footer with CTA button */}
                  {/* <CardFooter className="pt-0 pb-6 px-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full border-2 border-dashed group-hover:bg-${accentBase}-50 transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      Explore
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter> */}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default CategorySection;
