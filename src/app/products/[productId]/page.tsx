"use client";

import { useState } from "react";
import { Star, Heart, Share2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductGallery } from "../components/ProductGallery";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import { RelatedProducts } from "../components/RelatedProducts";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm text-muted-foreground">
                Back to Products
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-foreground">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-primary">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery />

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Cakes/Black Forest
              </p>
              <h1 className="mt-2 text-4xl font-bold text-foreground">
                Black Forest Cake
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Delicious & fresh, made with love
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (24 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-primary">₹650</div>

            {/* Size Selection */}
            <div>
              <label className="mb-3 block text-sm font-medium">Size</label>
              <div className="flex gap-3">
                {["small", "medium", "large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary"
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-3 block text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-lg border border-border px-3 py-2 hover:bg-muted"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-lg border border-border px-3 py-2 hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add to Cart
            </Button>

            {/* Product Details */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">Cakes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">Black Forest</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium text-green-600">In Stock</span>
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">
                  Please pre-order this cake 24 hours in advance and we can
                  deliver it to your doorstep. Enjoy the delicious taste of our
                  Black Forest Cake.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Review
            </Button>
          </div>

          {showReviewForm && (
            <div className="mb-8">
              <ReviewForm onSubmit={() => setShowReviewForm(false)} />
            </div>
          )}

          <ReviewsList />
        </div>
      </section>

      {/* Related Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
        <RelatedProducts />
      </section>
    </main>
  );
}
