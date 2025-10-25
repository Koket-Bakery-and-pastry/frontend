import { useState, useEffect } from "react";
import { Customer } from "../types/customer";

export function useCustomers(initialCustomers: Customer[]) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  const deleteCustomer = (id: number) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  const clearSearch = () => {
    setSearch("");
  };

  return {
    // State
    customers,
    search,
    currentPage,
    itemsPerPage,

    // Computed values
    filteredCustomers,
    currentCustomers,
    totalItems,

    // Actions
    setSearch,
    setCurrentPage,
    deleteCustomer,
    clearSearch,
  };
}
