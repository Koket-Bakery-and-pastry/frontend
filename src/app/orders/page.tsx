"use client";
import React, { useEffect, useState } from "react";
import { Order, OrderStatus, statusColors } from "../types/order";

import OrderCard from "./components/OrderCard";
import Pagination from "./components/Pagination";
import { mockOrders } from "../data/mockData";
import { ChevronLeft } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [expandedProductKeys, setExpandedProductKeys] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Extract unique categories from products
  const categories = [
    "All",
    ...new Set(
      orders.flatMap((order) =>
        (order.products || []).map((product) => product.name.split(" ")[0])
      )
    ),
  ];

  const parseDate = (dateString: string) => {
    const datePart = dateString.split(" at ")[0];
    return new Date(datePart);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    const matchesSearch = (order.customer || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const orderDate = parseDate(order.date || order.created_at || "");
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesFromDate = !from || orderDate >= from;
    const matchesToDate = !to || orderDate <= to;

    const matchesCategory =
      categoryFilter === "All" ||
      (order.products || []).some((product) =>
        product.name.toLowerCase().includes(categoryFilter.toLowerCase())
      );

    return (
      matchesStatus &&
      matchesSearch &&
      matchesFromDate &&
      matchesToDate &&
      matchesCategory
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterStatus,
    search,
    fromDate,
    toDate,
    categoryFilter,
    itemsPerPage,
    orders,
  ]);

  const totalItems = filteredOrders.length;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const handleReject = (id: string) => {
    setSelectedOrder(id);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (selectedOrder) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder
            ? { ...o, status: "rejected" as OrderStatus }
            : o
        )
      );
    }
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedOrder(null);
    setExpandedProductKeys((prev) =>
      prev.filter((k) => !k.startsWith(`${selectedOrder}-`))
    );
  };

  const clearFilters = () => {
    setFilterStatus("All");
    setSearch("");
    setFromDate("");
    setToDate("");
    setCategoryFilter("All");
    setItemsPerPage(5);
    setCurrentPage(1);
    setShowMobileFilters(false);
  };

  const isFilterActive =
    filterStatus !== "All" ||
    search !== "" ||
    fromDate !== "" ||
    toDate !== "" ||
    categoryFilter !== "All";

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const toggleProductDetail = (orderId: string, productId: string) => {
    const key = `${orderId}-${productId}`;
    setExpandedProductKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const isProductExpanded = (orderId: string, productId: string) =>
    expandedProductKeys.includes(`${orderId}-${productId}`);

  return (
    <div className="">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm text-muted-foreground">
                Back to Products
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="">
        <div className="overview px-3 sm:px-6 lg:px-10 py-6">
          {/* Orders List */}
          <div className="space-y-6">
            {paginatedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isProductExpanded={isProductExpanded}
                onToggleProductDetail={toggleProductDetail}
              />
            ))}

            {paginatedOrders.length === 0 && (
              <p className="text-gray-500 text-center mt-10">
                No orders found.
              </p>
            )}
          </div>

          {/* Universal Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
}
