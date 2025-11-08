"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ProductHeader, ProductFiltration } from "./components";
import { PageHeader, ProductCard } from "@/components";
import { ProductFilters } from "../types/ProductFilters";
import {
  getProducts,
  Product as APIProduct,
} from "@/app/services/productService";

const PAGE_SIZE = 6;

function ProductsPage() {
  const [allProducts, setAllProducts] = useState<APIProduct[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    category: "All Products",
    subcategory: "All Products",
    search: "",
    sort: "name",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        setAllProducts(data);
      } catch (err: any) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter, search, and sort
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by category
    if (filters.category !== "All Products") {
      products = products.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by subcategory
    if (
      filters.subcategory &&
      filters.subcategory !== "All Products" &&
      !filters.subcategory.startsWith("All ")
    ) {
      products = products.filter(
        (p) =>
          p.subcategory?.toLowerCase() === filters.subcategory.toLowerCase()
      );
    }

    // Search by name or description
    if (filters.search.trim() !== "") {
      const q = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (filters.sort === "priceAsc") {
      products.sort((a, b) => {
        const pa = Number(a.price ?? 0);
        const pb = Number(b.price ?? 0);
        return pa - pb;
      });
    } else if (filters.sort === "priceDesc") {
      products.sort((a, b) => {
        const pa = Number(a.price ?? 0);
        const pb = Number(b.price ?? 0);
        return pb - pa;
      });
    } else {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }, [filters, allProducts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div className="bg-background-2 min-h-screen">
      <PageHeader
        title="Our Products"
        subtitle="Browse our delicious selection of cakes and desserts"
      />

      <ProductFiltration filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 section-spacing bg-[#FFFAFF] px-4 sm:px-8 md:px-12 lg:px-16">
        {loading && (
          <div className="col-span-full text-center py-10 text-gray-600 h-screen">
            Loading products...
          </div>
        )}

        {error && (
          <div className="col-span-full text-center py-10 text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && paginatedProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found 😕
          </div>
        )}

        {!loading &&
          !error &&
          paginatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              image={"/assets/img1.png"}
              name={product.name}
              description={product.description}
              price={product.price ? `$${product.price}` : "$0.00"}
              productId={product._id}
            />
          ))}
      </div>

      {/* Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-8">
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
