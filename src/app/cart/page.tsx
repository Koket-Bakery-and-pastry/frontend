"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "./components/CartItem";
import { OrderSummary } from "./components/OrderSummary";
import { PageHeader } from "@/components";
import Link from "next/link";

interface CartItemData {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export default function ShoppingCartPage() {
  const [items, setItems] = useState<CartItemData[]>([
    {
      id: "1",
      image: "/assets/img1.png",
      name: "Black Forest Cake",
      category: "Cakes",
      price: 48,
      quantity: 1,
    },
    {
      id: "2",
      image: "/assets/img2.png",
      name: "Red Velvet Cake",
      category: "Cakes",
      price: 48,
      quantity: 1,
    },
    {
      id: "3",
      image: "/assets/img3.jpeg",
      name: "Chocolate Cake",
      category: "Cakes",
      price: 55,
      quantity: 1,
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen bg-white ">
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

            {items.length < 0 && (
              <div className="flex items-center justify-between bg-pink-100/70 border border-pink-200 text-sm text-pink-700 px-4 py-2 rounded-md mb-4">
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
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                    onClick={() => setSelectedIds([])}
                  >
                    Clear
                  </Button>
                )}
              </div>
            )}

            {items.length < 0 ? (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`transition-all duration-200 cursor-pointer rounded-lg border ${
                      selectedIds.includes(item.id)
                        ? "border-pink-400 bg-pink-50 shadow-md scale-[1.01]"
                        : "border-border bg-white hover:shadow-sm"
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
                    className="mt-6 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
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
