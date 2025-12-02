"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getUserOrders, type Order } from "../services/orderService";
import LoadingState from "@/components/LoadingState";
import { PageHeader } from "@/components";
import { ChevronLeft, Package, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ??
  "https://backend-om79.onrender.com";

const resolveImageUrl = (path?: string) => {
  if (!path) return "/assets/img1.png";
  if (/^https?:\/\//i.test(path)) return path;
  return `${ASSET_BASE_URL}${path}`;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  accepted: "bg-blue-100 text-blue-800 border-blue-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
  completed: "bg-green-100 text-green-800 border-green-300",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserOrders();
      // Sort by newest first (created_at descending)
      const sortedOrders = data.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });
      setOrders(sortedOrders);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to load orders";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter orders based on status
  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  if (isLoading) {
    return <LoadingState message="Loading your orders..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md p-6 text-center">
          <p className="text-red-600">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <PageHeader
          title="My Orders"
          subtitle="Track and manage your bakery orders"
        />

        <div className="section-spacing">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-foreground text-lg font-semibold mb-2">
                No orders yet
              </p>
              <p className="text-muted-foreground">
                Your orders will appear here once you place them
              </p>
            </div>
          ) : (
            <>
              {/* Filter Section */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter by Status:</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                    {filteredOrders.length}{" "}
                    {filteredOrders.length === 1 ? "order" : "orders"}
                  </span>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="All Orders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Package className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-foreground text-lg font-semibold mb-2">
                    No orders found
                  </p>
                  <p className="text-muted-foreground">
                    No orders match the selected status filter
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setStatusFilter("all")}
                  >
                    Clear Filter
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <Card key={order._id} className="p-6">
                      {/* Order Header */}
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b pb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Order ID
                          </p>
                          <p className="font-semibold">{order._id.slice(-8)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Delivery Date
                          </p>
                          <p className="font-semibold">
                            {new Date(order.delivery_time).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Status
                          </p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
                              statusColors[order.status] || statusColors.pending
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Rejection Comment */}
                      {order.status === "rejected" &&
                        order.rejection_comment && (
                          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm font-semibold text-red-800 mb-1">
                              Rejection Reason:
                            </p>
                            <p className="text-sm text-red-700">
                              {order.rejection_comment}
                            </p>
                          </div>
                        )}

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.order_items.map((item) => (
                          <div key={item._id} className="flex gap-4">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={resolveImageUrl(
                                  item.product?.images?.[0] ||
                                    item.product?.image_url
                                )}
                                alt={item.product?.name || "Product"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">
                                {item.product?.name || "Product"}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                                {item.kilo && ` • ${item.kilo}kg`}
                              </p>
                              {item.custom_text && (
                                <p className="text-sm text-primary mt-1">
                                  "{item.custom_text}"
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Price
                          </span>
                          <span className="font-semibold">
                            ${order.total_price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Upfront Paid
                          </span>
                          <span className="font-semibold text-green-600">
                            ${order.upfront_paid.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Remaining
                          </span>
                          <span className="font-semibold">
                            $
                            {(order.total_price - order.upfront_paid).toFixed(
                              2
                            )}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
