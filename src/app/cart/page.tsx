"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "./components/CartItem";
import { OrderSummary } from "./components/OrderSummary";
import { PageHeader } from "@/components";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import LoadingState from "@/components/LoadingState";

interface CartItemData {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  kilo?: number;
  custom_text?: string;
  additional_description?: string;
}

export default function ShoppingCartPage() {
  const { cartItems, isLoading, refreshCart } = useCart();
  const [items, setItems] = useState<CartItemData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Convert cart items from API to display format
  useEffect(() => {
    const mappedItems: CartItemData[] = cartItems.map((item) => ({
      id: item._id,
      // TODO: These will be populated from product_id when it's populated by backend
      image: "/assets/img1.png",
      name: "Product Name",
      category: "Cakes",
      price: 50, // Placeholder price
      quantity: item.quantity,
      kilo: item.kilo,
      custom_text: item.custom_text,
      additional_description: item.additional_description,
    }));
    setItems(mappedItems);
  }, [cartItems]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  const subtotal = items
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const total = subtotal;

  // Save selected items to localStorage when they change
  useEffect(() => {
    if (selectedIds.length > 0) {
      localStorage.setItem("selectedCartItems", JSON.stringify(selectedIds));
    } else {
      localStorage.removeItem("selectedCartItems");
    }
  }, [selectedIds]);

  if (isLoading) {
    return <LoadingState message="Loading your cart..." />;
  }

  return (
    <div className="min-h-screen bg-background ">
      <div>
        <div className="mb-12">
          <PageHeader
            title="Shopping Cart"
            subtitle="Tap to select your cakes and proceed to checkout"
          />
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8 px-4 lg:px-6 xl:px-10 2xl:px-16 3xl:px-24">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* 🆕 Selection Info Bar */}

            {items.length > 0 && (
              <div className="flex items-center justify-between bg-primary/10 border border-primary/30 text-sm text-primary px-4 py-2 rounded-md mb-4">
                <p>
                  Tap on an item to select it.{" "}
                  <span className="font-semibold">
                    {selectedIds.length} selected
                  </span>
                </p>
                {selectedIds.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/40 text-primary hover:bg-primary/10 bg-transparent"
                    onClick={() => setSelectedIds([])}
                  >
                    Clear
                  </Button>
                )}
              </div>
            )}

            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`transition-all duration-200 cursor-pointer rounded-lg border ${
                      selectedIds.includes(item.id)
                        ? "border-primary/40 bg-primary/10 shadow-md scale-[1.01]"
                        : "border-border bg-card hover:shadow-sm"
                    }`}
                  >
                    <CartItem
                      {...item}
                      selected={selectedIds.includes(item.id)}
                      onSelect={() => handleSelect(item.id)}
                      onQuantityChange={(quantity) =>
                        handleQuantityChange(item.id, quantity)
                      }
                      onDelete={() => handleDelete(item.id)}
                    />
                  </div>
                ))}
                <Link href="/products">
                  <Button
                    variant="outline"
                    className="mt-6 border-primary/40 text-primary hover:bg-primary/10 bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10 ">
                <img
                  src="/assets/empty.gif"
                  alt="No Products Found"
                  className="w-1/2  md:w-1/5 bg-background"
                />
                <p className="text-foreground mt-4 text-center">
                  <b>No product</b> <br /> found in your cart.
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary subtotal={subtotal} total={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
