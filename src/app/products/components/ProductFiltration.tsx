"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const categories = [
  "All Products",
  "Cake",
  "Quick Bread",
  "Cookies",
  "Fondant Cake",
];

const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
];

// filter options per top-level category (user provided catalogue)
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
  "Fondant Cake": [], // coming soon -> empty list
};

function ProductFiltration() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filterOptionsMap["All Products"][0]
  );
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Update filter options when top-level category changes
  useEffect(() => {
    const opts = filterOptionsMap[selectedCategory] ?? ["All Products"];
    setSelectedFilter(opts[0]);
  }, [selectedCategory]);

  const currentFilterOptions = filterOptionsMap[selectedCategory] ?? [];
  const isComingSoon = currentFilterOptions.length === 0;

  return (
    <div className="bg-[#FFFAFF] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Categories: dropdown on small screens, tabs on md+ */}
        <div className="mb-6">
          {/* small screens: dropdown */}
          <div className="block md:hidden max-w-xs">
            <label htmlFor="category-select" className="sr-only">
              Category
            </label>
            <div className="relative">
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full bg-white border rounded-lg px-4 py-2 pr-10 font-semibold text-sm"
                aria-label="Select category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">
                &#9662;
              </span>
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

          {/* md+ screens: horizontal tabs */}
          <div className="hidden md:flex gap-4 overflow-x-auto no-scrollbar py-1">
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
        </div>

        {/* Search & Filters - responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          {/* Search (full width on small, spans 2 cols on md+) */}
          <div className="md:col-span-2 w-full">
            <div className="flex items-center w-full bg-white rounded-lg border px-4 py-2">
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

          {/* Sort dropdown */}
          <div className="relative w-full lg:w-auto">
            <button
              className="w-full lg:w-auto bg-white border rounded-lg px-4 py-2 flex items-center gap-2 justify-between"
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

          {/* Category-specific Filter or Coming Soon */}
          <div className="w-full">
            {isComingSoon ? (
              <div className="flex items-center gap-3">
                <button
                  className="w-full bg-gray-100 text-gray-600 rounded-lg px-4 py-2 cursor-not-allowed"
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
                className="bg-white border rounded-lg px-4 py-2 w-full"
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

        {/* small helper text for coming soon (mobile) */}
        {isComingSoon && (
          <div className="mt-3 text-sm text-gray-600 lg:hidden">
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
