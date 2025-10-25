import { useState, useMemo } from "react";
import { Product } from "../types/product";

export function useProducts(
  initialProducts: Product[],
  productsPerPage: number = 12
) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(products.length / productsPerPage)),
    [products.length, productsPerPage]
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = useMemo(
    () => products.slice(indexOfFirstProduct, indexOfLastProduct),
    [products, indexOfFirstProduct, indexOfLastProduct]
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const deleteProduct = (index: number) => {
    const newProducts = products.filter((_, idx) => idx !== index);
    const newTotalPages = Math.max(
      1,
      Math.ceil(newProducts.length / productsPerPage)
    );

    setProducts(newProducts);
    setCurrentPage((prev) => (prev > newTotalPages ? newTotalPages : prev));
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (index: number, updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p, idx) => (idx === index ? updatedProduct : p))
    );
  };

  return {
    products,
    currentProducts,
    currentPage,
    totalPages,
    indexOfFirstProduct,
    productsPerPage,
    setCurrentPage,
    handleNext,
    handlePrev,
    deleteProduct,
    addProduct,
    updateProduct,
  };
}
