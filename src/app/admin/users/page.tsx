"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Customer } from "../../types/customer";
import { customersData } from "../../data/mockCustomers";
import HeroSection from "../components/HeroSection";
import CustomerFilters from "../components/CustomerFilters";
import CustomersList from "../components/CustomersList";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter customers based on search
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      String(customer.id).includes(search)
  );

  const totalItems = filteredCustomers.length;
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDelete = (id: number) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    setSelectedCustomer(null);
  };

  const openDeleteConfirm = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const cancelDelete = () => {
    setSelectedCustomer(null);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      handleDelete(selectedCustomer.id);
    }
  };

  const clearFilters = () => {
    setSearch("");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <HeroSection
        title="Customer"
        subtitle="Track customer details, orders, and updates all in one place"
        iconSrc="../../../../assets/User.png"
        iconAlt="user png"
      />

      {/* Main content */}
      <div className="min-h-screen flex justify-center items-start py-6 w-full px-4">
        <div className="w-full max-w-5xl mx-auto border border-black rounded-2xl">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold">
              Customer Management
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              View and Manage all registered customers
            </p>

            {/* Search Filters */}
            <CustomerFilters
              search={search}
              onSearchChange={setSearch}
              onClearFilters={clearFilters}
            />

            {/* Customers List */}
            <CustomersList
              customers={currentCustomers}
              onDelete={openDeleteConfirm}
            />

            {/* Universal Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
              className="mt-6"
            />
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={!!selectedCustomer}
          title="Are you sure?"
          message="This action cannot be undone. This will permanently delete the user from your shop."
          confirmText="Delete"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
}
