"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  total: number;
}

export function OrderSummary({ subtotal, total }: OrderSummaryProps) {
  return (
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

      <Link href="/checkout">
        <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white">
          Proceed to checkout
        </Button>
      </Link>
      <p className="text-center text-sm text-muted-foreground mt-4">
        All cakes are freshly baked to order.
      </p>
    </div>
  );
}
