"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PageHeader, ProductCard } from "@/components";
import ProductFiltration from "./components/ProductFiltration";
import { ProductFilters } from "../types/ProductFilters";
import { getProducts } from "@/app/services/productService";
import type { ProductSummary } from "@/app/types/product";
import LoadingState from "@/components/LoadingState";

const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ??
  "https://backend-om79.onrender.com";

const PAGE_SIZE = 6;

function ProductsPage() {
  const [allProducts, setAllProducts] = useState<ProductSummary[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    category: "All Products",
    subcategory: "All Subcategories",
    search: "",
    sort: "name",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
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

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Category filter
    if (filters.category !== "All Products") {
      products = products.filter(
        (p) =>
          p.category_id?.name?.trim().toLowerCase() ===
          filters.category.trim().toLowerCase()
      );
    }

    // Subcategory filter
    if (filters.subcategory && filters.subcategory !== "All Subcategories") {
      products = products.filter(
        (p) =>
          p.subcategory_id?.name?.trim().toLowerCase() ===
          filters.subcategory.trim().toLowerCase()
      );
    }

    // Search filter
    if (filters.search.trim() !== "") {
      const q = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          (p.name ?? "").toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }

    // Sorting
    if (filters.sort === "priceAsc") {
      products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (filters.sort === "priceDesc") {
      products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }, [filters, allProducts]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => setPage(1), [filters]);

  if (loading) {
    return <LoadingState message="Loading products…" />;
  }

  return (
    <div className="bg-background-2 min-h-screen">
      <PageHeader
        title="Our Products"
        subtitle="Browse our delicious selection of cakes and desserts"
      />

      <ProductFiltration filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 section-spacing bg-[#FFFAFF] px-4 sm:px-8 md:px-12 lg:px-16">
        {error && (
          <div className="col-span-full text-center py-10 text-red-500">
            {error}
          </div>
        )}

        {!error && paginatedProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found 😕
          </div>
        )}

        {!error &&
          paginatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              image={
                product.image_url
                  ? `${ASSET_BASE_URL}${product.image_url}`
                  : "/assets/img1.png"
              }
              name={product.name}
              description={product.description ?? ""}
              price={
                product.price
                  ? `$${product.price}`
                  : product.is_pieceable
                  ? "Per Piece"
                  : "By Kilo"
              }
              productId={product._id}
            />
          ))}
      </div>

      {/* Pagination Controls */}
      {!error && totalPages > 1 && (
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
