"use client";

import { useState } from "react";
import { Star, Heart, Share2, ChevronLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductGallery } from "../components/ProductGallery";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import { RelatedProducts } from "../components/RelatedProducts";
import { ProductCard } from "@/components";

export default function ProductPage() {
  const [message, setMessage] = useState("");
  const weightOptions = [
    { id: "500g", label: "0.5 kg", grams: 500, price: 350 },
    { id: "1kg", label: "1 kg", grams: 1000, price: 650 },
    { id: "1_5kg", label: "1.5 kg", grams: 1500, price: 950 },
  ];
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[1]); // default 1 kg
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fmt = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  });

  const allProducts = [
    {
      id: 1,
      image: "/assets/img1.png",
      name: "Chocolate Cake",
      description: "Chocolate Drip Cake with Mocha Frosting",
      price: 500,
      category: "Cake",
      subcategory: "Chocolate cakes",
    },
    {
      id: 2,
      image: "/assets/img2.png",
      name: "Red Velvet Cake",
      description: "Rich Red Velvet Cake with Cream Cheese Frosting",
      price: 550,
      category: "Cake",
      subcategory: "Red velvet cakes",
    },
    {
      id: 3,
      image: "/assets/img2.png",
      name: "Banana Bread",
      description: "Moist banana bread with vanilla flavor",
      price: 300,
      category: "Quick Bread",
      subcategory: "Banana bread",
    },
    {
      id: 4,
      image: "/assets/img2.png",
      name: "Chocolate Cookies",
      description: "Crispy chocolate cookies, half a kilo for 250 birr",
      price: 250,
      category: "Cookies",
      subcategory: "½kg - 250 birr",
    },
    {
      id: 5,
      image: "/assets/img2.png",
      name: "Muffin Pack",
      description: "Freshly baked vanilla muffins",
      price: 280,
      category: "Quick Bread",
      subcategory: "Muffin",
    },
    {
      id: 6,
      image: "/assets/img2.png",
      name: "Caramel Cake",
      description: "Soft caramel cake with buttery frosting",
      price: 520,
      category: "Cake",
      subcategory: "Caramel cakes",
    },
    {
      id: 7,
      image: "/assets/img2.png",
      name: "Caramel Cake",
      description: "Soft caramel cake with buttery frosting",
      price: 520,
      category: "Cake",
      subcategory: "Caramel cakes",
    },
    {
      id: 8,
      image: "/assets/img2.png",
      name: "Caramel Cake",
      description: "Soft caramel cake with buttery frosting",
      price: 520,
      category: "Cake",
      subcategory: "Caramel cakes",
    },
  ];

  return (
    <main className="min-h-screen bg-background px-4 lg:px-6 xl:px-10 2xl:px-16 3xl:px-24">
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
          </div>
        </div>
      </header>

      {/* Product Section */}
      <section className="mx- max-w-7xl ">
        <div className="grid gap-8 xl:grid-cols-2">
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
                Delicious & fresh, made with love Delicious & fresh, made with
                love Delicious & fresh, made with love Delicious & fresh, made
                with love Delicious & fresh, made with love Delicious & fresh,
                made with love Delicious & fresh, made with love
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{ fill: "#FFD700", color: "#FFD700" }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (24 reviews)
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="text-3xl font-bold text-[#C967AC]">
                {fmt.format(selectedWeight.price)}
              </div>
              <div className="text-sm text-muted-foreground">
                {fmt.format(selectedWeight.price)} · {selectedWeight.label}
              </div>
            </div>

            {/* Kilos + Message row */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium">Kilos</label>
                <select
                  value={selectedWeight.id}
                  onChange={(e) => {
                    const found = weightOptions.find(
                      (w) => w.id === e.target.value
                    );
                    if (found) setSelectedWeight(found);
                  }}
                  className="rounded-md border border-border px-3 py-2 text-sm w-24 text-center"
                  aria-label="Select weight"
                >
                  {weightOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium">
                  Message on cake
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g Happy Birthday!"
                  className="w-full rounded-md border border-border px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 flex items-center justify-center gap-2 bg-[#C967AC] text-white hover:bg-[#bd5b9e]"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </div>

            {/* Product Details */}
            <Card className="p-6 rounded-lg border border-border bg-background">
              <h3 className="mb-4 text-lg font-semibold">Product Details</h3>

              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground font-medium">
                      Category:
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground font-medium">
                      Type:
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground font-medium">
                      Availability:
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-right">
                  <div>
                    <span className="font-medium">Cakes</span>
                  </div>

                  <div>
                    <span className="font-medium">Black Forest</span>
                  </div>

                  <div>
                    <span className="font-medium text-green-600">In Stock</span>
                  </div>
                </div>

                <div className="md:col-span-2 mt-4 border-t border-border pt-4">
                  {/* <p className="text-sm text-muted-foreground leading-relaxed">
                    Please pay attention, that the time of delivery and pick up
                    can be changed due to the current state of workload! *The
                    cake on the image is given as an example, the finished
                    product may differ from the one shown on the site, because
                    it is handmade.
                  </p> */}
                </div>
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
              className="bg-[#C967AC] hover:bg-[#bd5b9e] text-white rounded-full px-4 py-2"
            >
              + Add Review
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
      <section className="">
        <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4   px-4 sm:px-8 md:px-12 lg:px-16">
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={`$${product.price}`}
                productId={product.id.toString()}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products found 😕
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
