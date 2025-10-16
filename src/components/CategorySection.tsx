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
import { Forward, Plus } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Cookies",
    image: "/assets/img2.png",
    tagline: "One bite, endless smiles!  love at first bite!",
  },
  {
    name: "Cakes",
    image: "/assets/img2.png",
    tagline: "One bite, endless smiles!  love at first bite!",
  },
  {
    name: "Breads",
    image: "/assets/img2.png",
    tagline: "One bite, endless smiles!  love at first bite!,",
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
    <section className=" bg-[linear-gradient(135deg,#FBEFF7_0%,#F8EFFA_50%,#F8EFFA_100%)] mt-8 section-spacing ">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center mb-16 text-balance font-kaushan"
        >
          Shop by Category
        </motion.h2>

        {/* Category grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div key={index} className="group relative pb-20">
              {/* Image Container */}
              <div className="relative rounded-xl overflow-hidden">
                <div className="aspect-[3.2/3] relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-gradient-to-b from-[#D9D9D9] to-[#D9D9D9]/40 transition-all duration-500 ease-in-out group-hover:opacity-100">
                    <div className="flex gap-4 transform translate-y-4 transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                      <Link
                        href={"/"}
                        className="p-5 rounded-full bg-secondary/60 hover:bg-secondary/80 transition-colors duration-300"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-6 right-6 px-2 py-6 md:py-6 lg:py-6 rounded-xl bg-[#E8BEDB] border shadow-xl text-foreground transition-all duration-500 ease-in-out transform group-hover:translate-y-2 ">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm lg:text-base 3xl:text-lg">
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
