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
import { createOrder, type OrderItemDTO } from "@/app/services/orderService";
import { toast } from "react-toastify";

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

const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ??
  "https://backend-om79.onrender.com";

const resolveImageUrl = (path?: string) => {
  if (!path) return "/assets/img1.png"; // Fallback image
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${ASSET_BASE_URL}${path}`;
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, isLoading, refreshCart } = useCart();

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
    const mapItem = (item: (typeof cartItems)[0]) => {
      const product = item.product;
      const imageUrl = product?.images?.[0] || product?.image_url;

      // Calculate price based on subcategory
      let price = 0;
      const subcategory =
        typeof product?.subcategory_id === "object"
          ? product.subcategory_id
          : null;

      if (subcategory) {
        // If item is sold by kilo and has kilo_to_price_map
        if (item.kilo && subcategory.kilo_to_price_map) {
          const kiloKey = `${item.kilo}kg`;
          price = subcategory.kilo_to_price_map[kiloKey] || 0;
        }
        // If item is sold by pieces, use direct price
        else if (item.pieces && subcategory.price) {
          price = subcategory.price;
        }
        // Fallback to direct price if available
        else if (subcategory.price) {
          price = subcategory.price;
        }
      }

      return {
        id: item._id,
        image: resolveImageUrl(imageUrl),
        name: product?.name || "Product Name",
        price: price,
        quantity: item.quantity,
        kilo: item.kilo,
        custom_text: item.custom_text,
        additional_description: item.additional_description,
      };
    };

    if (selectedIds.length === 0) {
      // If no items selected, use all cart items
      return cartItems.map(mapItem);
    }

    // Filter only selected items
    return cartItems
      .filter((item) => selectedIds.includes(item._id))
      .map(mapItem);
  }, [cartItems, selectedIds]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect if no items (but not if order was just placed)
  useEffect(() => {
    if (!isLoading && items.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [isLoading, items.length, router, orderPlaced]);

  if (isLoading) {
    return <LoadingState message="Loading checkout..." />;
  }

  const handlePaymentSubmit = async (formData: {
    deliveryDate: string;
    recipientPhone: string;
    paymentProof: File | null;
  }) => {
    if (
      !formData.deliveryDate ||
      !formData.recipientPhone ||
      !formData.paymentProof
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("No items in cart");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order items from cart items
      const orderItems: OrderItemDTO[] = cartItems
        .filter(
          (item) => selectedIds.length === 0 || selectedIds.includes(item._id)
        )
        .map((item) => ({
          product_id:
            typeof item.product_id === "string"
              ? item.product_id
              : item.product_id?._id || item.product?._id,
          quantity: item.quantity,
          kilo: item.kilo,
          pieces: item.pieces,
          custom_text: item.custom_text,
          additional_description: item.additional_description,
        }));

      // Convert delivery date to ISO string
      const deliveryTime = new Date(formData.deliveryDate).toISOString();

      // Create order payload
      const orderPayload = {
        order_items: orderItems,
        phone_number: formData.recipientPhone,
        delivery_time: deliveryTime,
        payment_proof_file: formData.paymentProof,
        upfront_paid: total * 0.3, // 30% upfront payment (adjust as needed)
        total_price: total,
      };

      // Create the order - backend will mark the cart items as is_ordered: true
      await createOrder(orderPayload);

      // Set flag to prevent redirect to cart
      setOrderPlaced(true);

      // Clear selected items from localStorage
      localStorage.removeItem("selectedCartItems");

      // Refresh cart context to get updated cart (without ordered items)
      await refreshCart();

      toast.success("Order placed successfully!");

      // Redirect to orders page
      router.push("/orders");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to place order";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Order Summary - Moved to top/left */}
            <div className="lg:col-span-1 order-1 2xl:order-2">
              <div className="sticky top-8">
                <div className="border-2 border-blue-400 rounded-lg p-6 bg-white">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total Price</span>
                      <span className="text-pink-500">${total.toFixed(2)}</span>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          Upfront Payment Required
                        </span>
                        <span className="text-lg font-bold text-primary">
                          ${(total * 0.3).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Pay 30% of the total price now. The remaining balance of{" "}
                        <span className="font-semibold">
                          ${(total * 0.7).toFixed(2)}
                        </span>{" "}
                        will be paid upon delivery.
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By placing this order, you agree to our terms and
                    conditions. Please ensure payment is completed before
                    delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & Payment Form */}
            <div className="lg:col-span-2 order-2 2xl:order-1">
              <ContactPaymentForm
                onSubmit={handlePaymentSubmit}
                isSubmitting={isSubmitting}
              />
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
