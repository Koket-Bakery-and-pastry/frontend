"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaBars } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const categories = [
  "All Products",
  "Cake",
  "Quick Bread",
  "Cookies",
  "Fondant Cake",
];

const sortOptions = [
  { label: "Price", value: "name" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
];

const filterOptionsMap: Record<string, string[]> = {
  "All Products": ["All Products"],
  Cake: [
    "All Cakes",
    "Chocolate cakes",
    "Caramel cakes",
    "Black forest cakes",
    "White forest cakes",
    "Red valvet cakes (Coming soon)",
    "Moca cakes",
    "Vanilla cakes",
    "Cup cakes",
    "Castered cakes",
  ],
  "Quick Bread": [
    "All Quick Bread",
    "Banana bread",
    "Date bread",
    "Muffin",
    "Brawoni",
    "Marble cake",
    "Marmalade bread",
  ],
  Cookies: ["All Cookies", "½kg - 250 birr", "2 kg - 500 birr"],
  "Fondant Cake": [], // coming soon
};

function ProductFiltration() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filterOptionsMap["All Products"][0]
  );
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // items with ids for mobile dropdown
  const items = categories.map((label) => ({
    id: label.replace(/\s+/g, "-").toLowerCase(),
    label,
  }));
  const activeTabItem =
    items.find((it) => it.label === selectedCategory) ?? items[0];

  // keep selectedFilter in sync with selectedCategory
  useEffect(() => {
    const opts = filterOptionsMap[selectedCategory] ?? ["All Products"];
    setSelectedFilter(opts[0]);
  }, [selectedCategory]);

  const currentFilterOptions = filterOptionsMap[selectedCategory] ?? [];
  const isComingSoon = currentFilterOptions.length === 0;

  function handleTabClick(label: string) {
    setSelectedCategory(label);
  }

  return (
    <div className="bg-[#FFFAFF] section-spacing">
      <div className="max-w-7xl ">
        {/* Mobile: active tab + dropdown for others */}
        <div className="mb-6 block 2xl:hidden">
          <div className="flex w-full items-center justify-between pr-4">
            <Link
              href={`?tab=${activeTabItem.id}`}
              onClick={() => handleTabClick(activeTabItem.label)}
              className="flex h-full py-1.5 items-center gap-2 border-b-2 border-[#C967AC] bg-[#C967AC]/20 font-bold px-4 text-sm text-[#C967AC] rounded-t-xl"
            >
              {activeTabItem.label}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 border-b-2 border-[#C967AC] bg-[#C967AC]/20 text-[#C967AC] rounded-t-md py-0.5 px-2 text-sm font-medium">
                  <FaBars />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {items
                  .filter((item) => item.id !== activeTabItem.id)
                  .map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleTabClick(item.label)}
                      className="flex items-center gap-2"
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {selectedCategory === "Fondant Cake" && (
            <div className="mt-2 text-xs text-gray-600">
              Fondant Cake is coming soon —{" "}
              <a
                href={`mailto:hello@sweetcake.com?subject=Notify me when ${encodeURIComponent(
                  selectedCategory
                )} is available`}
                className="text-[#C967AC] hover:underline"
              >
                request notification
              </a>
              .
            </div>
          )}
        </div>

        {/* Desktop tabs */}
        <div className="hidden 2xl:flex gap-4 overflow-x-auto no-scrollbar py-1 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow text-sm sm:text-base ${
                selectedCategory === cat
                  ? "bg-pink-400 text-white"
                  : "bg-white text-black"
              } transition`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          <div className="col-span-2 md:col-span-3 w-full">
            <div className="flex items-center w-full bg-white rounded-lg border px-6 py-3">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder={`Search ${
                  selectedCategory === "All Products"
                    ? "products"
                    : selectedCategory.toLowerCase()
                }...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-lg"
                aria-label="Search products"
              />
            </div>
          </div>

          <div className="flex justify-end w-full col-span-1 ">
            <div className="relative w-full lg:w-auto">
              <button
                className="w-full lg:w-auto bg-white border rounded-lg px-4 py-3 flex items-center gap-2 justify-between"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                aria-haspopup="listbox"
                aria-expanded={showSortDropdown}
              >
                {sortOptions.find((opt) => opt.value === selectedSort)?.label}
                <span className="ml-2 text-gray-600">&#9662;</span>
              </button>

              {showSortDropdown && (
                <div className="absolute z-20 mt-2 left-0 lg:left-auto lg:right-0 bg-white rounded-lg shadow-lg py-2 w-full lg:w-48">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSelectedSort(opt.value);
                        setShowSortDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-orange-100 ${
                        selectedSort === opt.value
                          ? "bg-orange-300 text-black font-semibold"
                          : "text-black"
                      }`}
                    >
                      {selectedSort === opt.value && (
                        <span className="mr-2">&#10003;</span>
                      )}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full col-span-1">
            {isComingSoon ? (
              <div className="flex items-center  gap-3">
                <button
                  className="w-full bg-gray-100 text-gray-600 rounded-lg px-4 py-3 cursor-not-allowed"
                  disabled
                  aria-disabled="true"
                >
                  Coming soon
                </button>
                <a
                  href={`mailto:hello@sweetcake.com?subject=Notify me when ${encodeURIComponent(
                    selectedCategory
                  )} is available`}
                  className="hidden lg:inline-block text-sm text-[#C967AC] hover:underline"
                >
                  Notify me
                </a>
              </div>
            ) : (
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-white border rounded-lg px-4 py-3 w-full"
                aria-label="Filter products"
              >
                {currentFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* mobile helper for coming soon */}
        {isComingSoon && (
          <div className="mt-3 text-sm text-gray-600 xl:hidden">
            {selectedCategory} is coming soon —{" "}
            <a
              href={`mailto:hello@sweetcake.com?subject=Notify me when ${encodeURIComponent(
                selectedCategory
              )} is available`}
              className="text-[#C967AC] hover:underline"
            >
              request notification
            </a>
            .
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductFiltration;
