"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "./components/CartItem";
import { OrderSummary } from "./components/OrderSummary";
import { PageHeader } from "@/components";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import LoadingState from "@/components/LoadingState";
import { updateCartItem, removeFromCart } from "@/app/services/cartService";
import { toast } from "react-toastify";

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

export default function ShoppingCartPage() {
  const { cartItems, isLoading, refreshCart } = useCart();
  const [items, setItems] = useState<CartItemData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Refresh cart when component mounts
  useEffect(() => {
    refreshCart();
  }, []);

  // Convert cart items from API to display format
  useEffect(() => {
    const mappedItems: CartItemData[] = cartItems.map((item) => {
      const product = item.product;
      const imageUrl = product?.images?.[0] || product?.image_url;

      // Get category name
      const categoryName =
        typeof product?.category_id === "object"
          ? product.category_id.name
          : "Category";

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
        category: categoryName,
        price: price,
        quantity: item.quantity,
        kilo: item.kilo,
        custom_text: item.custom_text,
        additional_description: item.additional_description,
      };
    });
    setItems(mappedItems);
  }, [cartItems]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleQuantityChange = async (id: string, quantity: number) => {
    try {
      // Update in API
      await updateCartItem(id, { quantity });

      // Update local state
      setItems(
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );

      // Refresh cart context
      await refreshCart();
    } catch (error: any) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Delete from API
      await removeFromCart(id);

      // Update local state
      setItems(items.filter((item) => item.id !== id));
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));

      // Refresh cart context
      await refreshCart();

      toast.success("Item removed from cart");
    } catch (error: any) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to remove item");
    }
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
              <OrderSummary
                subtotal={subtotal}
                total={total}
                selectedIds={selectedIds}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
