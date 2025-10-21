"use client";
import React, { useEffect } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Category =
  | "All Products"
  | "Cake"
  | "Quick Bread"
  | "Cookies"
  | "Fondant Cake";

type SubCategories = {
  [key in Category]: string[];
};

const categories: Category[] = [
  "All Products",
  "Cake",
  "Quick Bread",
  "Cookies",
  "Fondant Cake",
];

const subCategories: SubCategories = {
  "All Products": ["All Products"],
  Cake: [
    "All Cakes",
    "Chocolate cakes",
    "Caramel cakes",
    "Red velvet cakes",
    "Vanilla cakes",
  ],
  "Quick Bread": ["All Quick Bread", "Banana bread", "Muffin", "Marble cake"],
  Cookies: ["All Cookies", "½kg - 250 birr", "2 kg - 500 birr"],
  "Fondant Cake": [],
};

const sortOptions = [
  { label: "Price", value: "name" },
  { label: "Low to High", value: "priceAsc" },
  { label: "High to Low", value: "priceDesc" },
];

type ProductFilters = {
  category: Category;
  subcategory: string;
  search: string;
  sort: string;
};

type ProductFiltrationProps = {
  filters: ProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
};

export default function ProductFiltration({
  filters,
  setFilters,
}: ProductFiltrationProps) {
  const { category, subcategory, search, sort } = filters;

  // Keep subcategory list synced with selected category
  useEffect(() => {
    const availableSubs = subCategories[category] || ["All Products"];
    if (!availableSubs.includes(subcategory)) {
      setFilters((prev) => ({
        ...prev,
        subcategory: availableSubs[0],
      }));
    }
  }, [category]);

  const currentSubcategories = subCategories[category] || ["All Products"];

  return (
    <div className="bg-[#FFFAFF] px-3 xss:px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-6 xss:pt-8 sm:pt-12 md:pt-16 lg:pt-20 ">
      <div className="max-w-7xl ">
        {/* Mobile category selector */}
        <div className="mb-6 block 2xl:hidden">
          <div className="flex justify-between items-center">
            <Link
              href="#"
              onClick={() => setFilters((prev) => ({ ...prev, category }))}
              className="px-4 py-2 rounded-t-xl border-b-2 border-[#C967AC] bg-[#C967AC]/20 text-[#C967AC] font-bold text-sm"
            >
              {category}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 border-b-2 border-[#C967AC] bg-[#C967AC]/20 text-[#C967AC] rounded-t-md py-1 px-3 text-sm font-medium">
                  <FaBars />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories
                  .filter((c) => c !== category)
                  .map((c) => (
                    <DropdownMenuItem
                      key={c}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, category: c }))
                      }
                    >
                      {c}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop category tabs */}
        <div className="hidden 2xl:flex gap-4 overflow-x-auto no-scrollbar mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
              className={`px-4 py-2 rounded-lg font-semibold shadow text-sm transition ${
                category === cat
                  ? "bg-pink-400 text-white"
                  : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search, Sort, and Subcategory Filter */}
        <div className="grid grid-cols-2 2xl:grid-cols-5 gap-3 items-center">
          {/* Search */}
          <div className="col-span-2 2xl:col-span-3">
            <div className="flex items-center bg-white rounded-lg border px-6 py-3">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder={`Search ${category.toLowerCase()}...`}
                value={search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full bg-transparent outline-none text-lg"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="col-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full bg-white border rounded-lg px-2 md:px-4 py-3 flex items-center justify-between">
                  <span className="line-clamp-1">
                    {sortOptions.find((s) => s.value === sort)?.label}
                  </span>
                  <span className="ml-2 text-gray-600">&#9662;</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, sort: opt.value }))
                    }
                  >
                    {opt.label}
                    {sort === opt.value && (
                      <span className="ml-auto text-green-600">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Subcategory */}
          <div className="col-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full bg-white border rounded-lg px-2 md:px-4 py-3 flex items-center justify-between">
                  <span className="line-clamp-1">{subcategory}</span>
                  <span className="ml-2 text-gray-600">&#9662;</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {currentSubcategories.map((sub) => (
                  <DropdownMenuItem
                    key={sub}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, subcategory: sub }))
                    }
                  >
                    {sub}
                    {subcategory === sub && (
                      <span className="ml-auto text-green-600">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
