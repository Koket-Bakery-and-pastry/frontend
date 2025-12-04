"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
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

const PAGE_SIZE = 8;

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
        const message = "Failed to load products.";
        setError(message);
        toast.error(message);
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
      <div className="py-6 sm:py-8 md:py-12">
        <div className="section-spacing mb-8 sm:mb-10">
          <PageHeader
            title="Our Products"
            subtitle="Discover our handcrafted cakes and delicious desserts made with love"
          />
        </div>

        <ProductFiltration filters={filters} setFilters={setFilters} />

        <div className="section-spacing mt-8">
          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center min-h-[400px] py-12">
              <div className="max-w-md w-full text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-50 dark:from-red-950/30 dark:to-red-900/20 border-2 border-red-200 dark:border-red-800">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Oops! Something Went Wrong
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!error && paginatedProducts.length === 0 && (
            <div className="flex items-center justify-center min-h-[500px] py-12">
              <div className="max-w-md w-full text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  No Products Found
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  We couldn't find any products matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: "All Products",
                      subcategory: "All Subcategories",
                      search: "",
                      sort: "name",
                    })
                  }
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!error && paginatedProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
                // Determine the price to display based on product type
                let displayPrice = "Contact for Price";

                // Check if product has kilo_to_price_map (sold by weight)
                if (
                  product.kilo_to_price_map &&
                  Object.keys(product.kilo_to_price_map).length > 0
                ) {
                  const prices = Object.values(product.kilo_to_price_map);
                  const minPrice = Math.min(...prices);
                  displayPrice = `$${minPrice.toFixed(2)}`;
                }
                // Check if product is pieceable (sold per piece with subcategory price)
                else if (
                  product.is_pieceable &&
                  product.subcategory_id?.price
                ) {
                  displayPrice = `$${product.subcategory_id.price.toFixed(2)}`;
                }

                return (
                  <ProductCard
                    key={product._id}
                    image={
                      product.image_url
                        ? `${ASSET_BASE_URL}${product.image_url}`
                        : "/assets/img1.png"
                    }
                    name={product.name}
                    description={product.description ?? ""}
                    price={displayPrice}
                    category={product.category_id?.name}
                    productId={product._id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {!error && totalPages > 1 && (
        <div className="section-spacing mt-12">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-8 bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">
                Page {page} of {totalPages}
              </span>
              <span>•</span>
              <span>{filteredProducts.length} total products</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-card border-2 border-border text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary transition-all flex items-center gap-2"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        page === pageNum
                          ? "bg-primary text-primary-foreground shadow-lg scale-110"
                          : "bg-card border-2 border-border text-foreground hover:bg-primary/10 hover:border-primary"
                      }`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                className="px-4 py-2 rounded-lg bg-card border-2 border-border text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary transition-all flex items-center gap-2"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
