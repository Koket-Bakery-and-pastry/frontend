"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactPaymentForm } from "./components/ContactPaymentForm";
import { CheckoutItemPreview } from "./components/CheckoutItemPreview";
import { PageHeader } from "@/components";
import ProtectedRoute from "@/components/ProtectedRoute";

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [items] = useState<CartItem[]>([
    {
      id: "1",
      image: "/black-forest-cake.png",
      name: "Black Forest Cake",
      price: 48,
      quantity: 3,
    },
  ]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

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
                  <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white">
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
