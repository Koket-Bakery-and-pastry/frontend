"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContactPaymentForm } from "./components/ContactPaymentForm";
import { CheckoutItemPreview } from "./components/CheckoutItemPreview";
import { PageHeader } from "@/components";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCart } from "@/app/context/CartContext";
import LoadingState from "@/components/LoadingState";

interface CheckoutItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  kilo?: number;
  custom_text?: string;
  additional_description?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, isLoading } = useCart();
  
  // Get selected item IDs from URL params or localStorage
  const selectedIds = useMemo(() => {
    const urlIds = searchParams.get("items");
    if (urlIds) {
      return urlIds.split(",");
    }
    // Fallback to localStorage if no URL params
    const stored = localStorage.getItem("selectedCartItems");
    return stored ? JSON.parse(stored) : [];
  }, [searchParams]);

  // Map cart items to checkout format
  const items = useMemo(() => {
    if (selectedIds.length === 0) {
      // If no items selected, use all cart items
      return cartItems.map((item) => ({
        id: item._id,
        // TODO: These will be populated from product_id when backend populates it
        image: "/assets/img1.png",
        name: "Product Name",
        price: 50, // Placeholder
        quantity: item.quantity,
        kilo: item.kilo,
        custom_text: item.custom_text,
        additional_description: item.additional_description,
      }));
    }
    
    // Filter only selected items
    return cartItems
      .filter((item) => selectedIds.includes(item._id))
      .map((item) => ({
        id: item._id,
        // TODO: These will be populated from product_id when backend populates it
        image: "/assets/img1.png",
        name: "Product Name",
        price: 50, // Placeholder
        quantity: item.quantity,
        kilo: item.kilo,
        custom_text: item.custom_text,
        additional_description: item.additional_description,
      }));
  }, [cartItems, selectedIds]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  // Redirect if no items
  useEffect(() => {
    if (!isLoading && items.length === 0) {
      router.push("/cart");
    }
  }, [isLoading, items.length, router]);

  if (isLoading) {
    return <LoadingState message="Loading checkout..." />;
  }

  const handlePaymentSubmit = (data: any) => {
    console.log("Payment data submitted:", data);
    // Handle payment submission
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background ">
        <div className="">
          <div className="mb-12">
            <PageHeader
              title="Shopping Cart"
              subtitle="Thank you for choosing Koket Bakery & Pastry! Review your order below and proceed to payment."
            />
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8 mb-8 section-spacing">
            {/* Contact & Payment Form */}
            <div className="lg:col-span-2">
              <ContactPaymentForm onSubmit={handlePaymentSubmit} />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="border-2 border-blue-400 rounded-lg p-6 bg-white">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-pink-500">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Place Order
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By placing this order, you agree to our terms and
                    conditions. Please ensure payment is completed before
                    delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items Preview */}
          {/* <div className="space-y-4 px-3 xss:px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-2xl">
          {items.map((item) => (
            <CheckoutItemPreview key={item.id} {...item} />
          ))}
        </div> */}
        </div>
      </div>
    </ProtectedRoute>
  );
}
