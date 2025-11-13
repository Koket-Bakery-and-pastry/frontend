"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Product, ProductFilters } from "../../types/product";
import HeroSection from "../components/HeroSection";
import ProductsHeader from "../components/ProductsHeader";
import ProductsGrid from "../components/ProductsGrid";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import ProductFiltersComponent from "../components/ProductFilters";

const API_BASE_URL = "http://localhost:5001";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Filters state
  const [filters, setFilters] = useState<ProductFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    productId: string;
    productName: string;
  } | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Build query string from filters
        const queryParams = new URLSearchParams();
        if (filters.categoryId)
          queryParams.append("categoryId", filters.categoryId);
        if (filters.subcategoryId)
          queryParams.append("subcategoryId", filters.subcategoryId);

        const url = `${API_BASE_URL}/api/v1/products${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products || data.data || data);
      } catch (err) {
        console.error("Error fetching products:", err);
        const message =
          err instanceof Error ? err.message : "Failed to fetch products";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const totalItems = products.length;
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProduct = () => {
    if (typeof window !== "undefined") {
      const base = window.location.pathname.replace(/\/$/, "");
      window.location.href = `${base}/add`;
    }
  };

  const handleEditProduct = (id: string) => {
    if (typeof window !== "undefined") {
      const base = window.location.pathname.replace(/\/$/, "");
      window.location.href = `${base}/edit/${id}`;
    }
  };

  const openDeleteConfirm = (productId: string, productName: string) => {
    setProductToDelete({ productId, productName });
    setConfirmOpen(true);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setConfirmOpen(false);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/products/${productToDelete.productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      // Remove product from state
      setProducts((prev) =>
        prev.filter((product) => product._id !== productToDelete.productId)
      );

      // Reset to first page if current page becomes empty
      const newTotalItems = products.length - 1;
      const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(Math.max(1, newTotalPages));
      }

      setProductToDelete(null);
      setConfirmOpen(false);
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      const message =
        err instanceof Error ? err.message : "Failed to delete product";
      setError(message);
      toast.error(message);
    }
  };

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Products"
        subtitle="Manage all products and inventory in one place"
        iconSrc="../../../../assets/User.png"
        iconAlt="products icon"
      />

      <main className="max-w-max mx-auto px-3 sm:px-6 lg:px-8 mt-6">
        <section className="bg-card border-2 border-border rounded-3xl shadow-sm overflow-hidden">
          <ProductsHeader
            title="All Products"
            onAddProduct={handleAddProduct}
            filterCount={Object.keys(filters).length}
            onToggleFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />

          {/* Filters Section */}
          {showFilters && (
            <div className="px-4 sm:px-6 py-4 border-b">
              <ProductFiltersComponent
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          )}

          <div className="p-4 sm:p-6 bg-background-2">
            <ProductsGrid
              products={currentProducts}
              indexOfFirstProduct={(currentPage - 1) * itemsPerPage}
              onEdit={handleEditProduct}
              onDelete={(index, productId) => {
                const product = currentProducts[index];
                openDeleteConfirm(productId, product.name);
              }}
            />
          </div>

          {/* Universal Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
            variant="compact"
            className="px-4 sm:px-6 py-3 sm:py-4 border-t"
          />
        </section>
      </main>

      <ConfirmationModal
        isOpen={confirmOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${productToDelete?.productName}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
