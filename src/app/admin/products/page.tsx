"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "../../types/product";
import { mockProducts } from "../../data/mockProducts";
import HeroSection from "../components/HeroSection";
import ProductsHeader from "../components/ProductsHeader";
import ProductsGrid from "../components/ProductsGrid";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // You can make this dynamic if needed

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDeleteIndex, setProductToDeleteIndex] = useState<
    number | null
  >(null);

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

  const handleEditProduct = (id: number) => {
    if (typeof window !== "undefined") {
      const base = window.location.pathname.replace(/\/$/, "");
      window.location.href = `${base}/edit/${id}`;
    }
  };

  const openDeleteConfirm = (index: number) => {
    setProductToDeleteIndex(index);
    setConfirmOpen(true);
  };

  const cancelDelete = () => {
    setProductToDeleteIndex(null);
    setConfirmOpen(false);
  };

  const confirmDelete = () => {
    if (productToDeleteIndex === null) return;

    setProducts((prev) =>
      prev.filter((_, idx) => idx !== productToDeleteIndex)
    );
    setProductToDeleteIndex(null);
    setConfirmOpen(false);

    // Reset to first page if current page becomes empty
    const newTotalItems = products.length - 1;
    const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }
  };

  const getProductName = () => {
    if (productToDeleteIndex === null) return "this product";
    return products[productToDeleteIndex]?.name || "this product";
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="Customer"
        subtitle="Track customer details, orders, and updates all in one place"
        iconSrc="../../../../assets/User.png"
        iconAlt="user png"
      />

      <main className="max-w-max mx-auto px-3 sm:px-6 lg:px-8 mt-6">
        <section className="bg-white border-2 rounded-3xl shadow-sm overflow-hidden">
          <ProductsHeader
            title="All Products"
            onAddProduct={handleAddProduct}
          />

          <div className="p-4 sm:p-6 bg-[#FFFAFF]">
            <ProductsGrid
              products={currentProducts}
              indexOfFirstProduct={(currentPage - 1) * itemsPerPage}
              onEdit={handleEditProduct}
              onDelete={openDeleteConfirm}
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
        message={`Are you sure you want to delete ${getProductName()}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
