"use client";
import React, { useState } from "react";
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

const filterOptions = [
  "All Products",
  "Cake",
  "Quick Bread",
  "Cookies",
  "Fondant Cake",
];

function ProductFiltration() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Products");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  return (
    <div className="bg-[#FFFAFF] py-6 px-32">
      {/* Category Tabs */}
      <div className="flex gap-6 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-lg font-semibold shadow ${
              selectedCategory === cat
                ? "bg-pink-400 text-white"
                : "bg-white text-black"
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center w-full md:w-1/2 bg-white rounded-lg border px-4 py-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-lg"
          />
        </div>
        {/* Filter Dropdown */}
        <div className="relative">
          <button
            className="bg-white border rounded-lg px-4 py-2 flex items-center gap-2 min-w-[150px] justify-between"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            {sortOptions.find((opt) => opt.value === selectedSort)?.label}
            <span className="ml-2">&#9662;</span>
          </button>
          {showSortDropdown && (
            <div className="absolute top-12 left-0 bg-white rounded-lg shadow-lg py-2 w-48 z-10">
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
        {/* Category Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-white border rounded-lg px-4 py-2 min-w-[150px]"
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProductFiltration;
