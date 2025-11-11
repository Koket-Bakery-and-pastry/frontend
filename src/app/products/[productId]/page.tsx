"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Star, ChevronLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductGallery } from "../components/ProductGallery";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import {
  addToCart,
  createProductReview,
  getProductById,
  type AddToCartPayload,
} from "@/app/services/productService";
import { useCart } from "@/app/context/CartContext";
import type { ProductDetail, ProductSummary } from "@/app/types/product";
import ProductCard from "@/components/ProductCard";

const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "https://backend-om79.onrender.com";

const currencyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

type WeightOption = {
  id: string;
  label: string;
  price?: number;
};

const resolveImageUrl = (path?: string) => {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${ASSET_BASE_URL}${path}`;
};

const formatWeightLabel = (raw: string) => {
  const normalized = raw.trim().toLowerCase();
  if (normalized.endsWith("kg") || normalized.endsWith("g")) {
    return raw;
  }
  const numeric = Number(normalized);
  if (!Number.isNaN(numeric)) {
    return numeric >= 1 ? `${numeric} kg` : `${numeric * 1000} g`;
  }
  return raw;
};

const buildWeightOptions = (product: ProductDetail): WeightOption[] => {
  const entries = Object.entries(product.kilo_to_price_map ?? {});
  if (entries.length) {
    return entries.map(([key, value]) => ({
      id: key,
      label: formatWeightLabel(key),
      price: typeof value === "number" ? value : Number(value),
    }));
  }

  if (typeof product.price === "number") {
    return [
      {
        id: "default",
        label: "Standard",
        price: product.price,
      },
    ];
  }

  return [];
};

const parseKiloValue = (input?: string) => {
  if (!input) return undefined;
  const cleaned = input.replace(/[^0-9.]/g, "");
  if (!cleaned) return undefined;
  const numeric = Number(cleaned);
  return Number.isNaN(numeric) ? undefined : numeric;
};

export default function ProductPage() {
  const params = useParams<{ productId: string }>();
  const { refreshCart } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductSummary[]>([]);
  const [weightOptions, setWeightOptions] = useState<WeightOption[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [cartSuccess, setCartSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [pieces, setPieces] = useState<number | undefined>(undefined);
  const [additionalDescription, setAdditionalDescription] = useState("");

  const productId = params?.productId?.toString();

  useEffect(() => {
    if (!productId) {
      setError("Missing product identifier.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getProductById(productId)
      .then((data) => {
        if (cancelled) return;

        const related = Array.isArray(data.related_products)
          ? data.related_products
          : [];
        const reviews = Array.isArray(data.reviews) ? data.reviews : [];

        const normalizedReviews = reviews.map((review) => {
          const productRef = review.product_id;
          const normalizedProduct =
            typeof productRef === "string"
              ? productRef
              : {
                  ...productRef,
                  image_url: resolveImageUrl(productRef.image_url),
                };

          return {
            ...review,
            product_id: normalizedProduct,
          };
        });

        const resolvedProduct: ProductDetail = {
          ...data,
          image_url: resolveImageUrl(data.image_url),
          related_products: related.map((item) => ({
            ...item,
            image_url: resolveImageUrl(item.image_url),
          })),
          reviews: normalizedReviews,
        };

        const options = buildWeightOptions(resolvedProduct);

        setProduct(resolvedProduct);
        setRelatedProducts(resolvedProduct.related_products);
        setWeightOptions(options);
        setSelectedWeight(options[0] ?? null);
        setPieces(resolvedProduct.is_pieceable ? 1 : undefined);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Unable to load product details.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [productId, refreshIndex]);

  const galleryImages = useMemo(() => {
    if (!product?.image_url) {
      return [];
    }
    return [product.image_url];
  }, [product?.image_url]);

  const priceValue = selectedWeight?.price ?? product?.price;
  const priceLabel =
    typeof priceValue === "number"
      ? currencyFormatter.format(priceValue)
      : "Price on request";

  const priceMeta = selectedWeight
    ? selectedWeight.price
      ? `${currencyFormatter.format(selectedWeight.price)} · ${
          selectedWeight.label
        }`
      : selectedWeight.label
    : product?.price
    ? "Standard price"
    : "Contact us for pricing";

  const computePriceLabel = (item: ProductSummary) => {
    const kiloValues = item.kilo_to_price_map
      ? Object.values(item.kilo_to_price_map)
      : [];
    const firstPrice =
      item.price ?? (kiloValues.length ? kiloValues[0] : undefined);
    return typeof firstPrice === "number"
      ? currencyFormatter.format(firstPrice)
      : "Price on request";
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background-2">
        <p className="text-sm text-muted-foreground">Loading product…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background-2 px-4">
        <Card className="max-w-md p-6 text-center">
          <h2 className="text-lg font-semibold text-foreground">{error}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
          <Button
            className="mt-4"
            onClick={() => setRefreshIndex((prev) => prev + 1)}
          >
            Retry
          </Button>
        </Card>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background-2">
        <p className="text-sm text-muted-foreground">Product not found.</p>
      </main>
    );
  }

  const categoryName = product.category_id?.name ?? "";
  const subcategoryName = product.subcategory_id?.name ?? "";
  const categoryLabel = [categoryName, subcategoryName]
    .filter(Boolean)
    .join(" / ");
  const reviews = product.reviews ?? [];
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce(
          (sum, review) =>
            sum + (typeof review.rating === "number" ? review.rating : 0),
          0
        ) / totalReviews
      : 0;
  const ratingValue = Math.min(5, Math.max(0, Math.round(averageRating)));

  const handleReviewSubmit = async ({
    rating,
    comment,
    name,
  }: {
    rating: number;
    comment: string;
    name?: string;
  }) => {
    if (!productId) {
      setReviewError("Missing product identifier.");
      return;
    }

    try {
      setIsSubmittingReview(true);
      setReviewError(null);
      const payload = {
        product_id: productId,
        rating,
        comment,
        ...(name ? { name } : {}),
      };

      await createProductReview(payload);
      setShowReviewForm(false);
      setRefreshIndex((prev) => prev + 1);
    } catch (submitError: any) {
      const apiMessage =
        submitError?.response?.data?.message ??
        submitError?.message ??
        "Unable to submit review. Please try again.";
      setReviewError(apiMessage);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleAddToCart = async () => {
    if (!productId) {
      setCartError("Missing product identifier.");
      return;
    }

    setCartError(null);
    setCartSuccess(null);
    setIsAddingToCart(true);

    const kiloValue = parseKiloValue(selectedWeight?.id);
    const payload: AddToCartPayload = {
      product_id: productId,
      quantity: 1,
    };

    if (typeof kiloValue === "number") {
      payload.kilo = kiloValue;
    } else if (selectedWeight) {
      payload.kilo = 1;
    } else if (!product?.is_pieceable) {
      payload.kilo = 1;
    }

    if (product?.is_pieceable && typeof pieces === "number" && pieces > 0) {
      payload.pieces = pieces;
    }

    if (message.trim()) {
      payload.custom_text = message.trim();
    }

    if (additionalDescription.trim()) {
      payload.additional_description = additionalDescription.trim();
    }

    try {
      await addToCart(payload);
      await refreshCart();
      setCartSuccess("Added to cart successfully.");
    } catch (cartErr: any) {
      const apiMessage =
        cartErr?.response?.data?.message ??
        cartErr?.message ??
        "Unable to add item to cart.";
      setCartError(apiMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <main className="min-h-screen bg-background-2 px-4 lg:px-6 xl:px-10 2xl:px-16 3xl:px-24">
      <header className="border-b border-border py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">Back to Products</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 xl:px-0">
        <div className="grid gap-8 4xl:gap-20 xl:grid-cols-2">
          <ProductGallery images={galleryImages} name={product.name} />

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted-foreground">{categoryLabel}</p>
              <h1 className="mt-2 text-2xl font-bold text-foreground md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground md:text-sm">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{
                      fill: i < ratingValue ? "#FFD700" : "transparent",
                      color: i < ratingValue ? "#FFD700" : "#d1d5db",
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {totalReviews > 0
                  ? `(${totalReviews} review${totalReviews === 1 ? "" : "s"})`
                  : "No reviews yet"}
              </span>
            </div>

            <div>
              <div className="text-3xl font-bold text-[#C967AC]">
                {priceLabel}
              </div>
              <div className="text-sm text-muted-foreground">{priceMeta}</div>
            </div>

            <div className="flex flex-col gap-6 2xl:flex-row">
              {weightOptions.length > 0 && (
                <div className="flex flex-col">
                  <label className="mb-2 block text-sm font-medium">
                    Kilos
                  </label>
                  <select
                    value={selectedWeight?.id ?? ""}
                    onChange={(event) => {
                      const next = weightOptions.find(
                        (option) => option.id === event.target.value
                      );
                      setSelectedWeight(next ?? null);
                    }}
                    className="w-32 rounded-md border border-border px-3 py-2 text-center text-sm"
                    aria-label="Select weight"
                  >
                    {weightOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                        {typeof option.price === "number"
                          ? ` — ${currencyFormatter.format(option.price)}`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {product.is_pieceable && (
                <div className="flex flex-col">
                  <label className="mb-2 block text-sm font-medium">
                    Pieces
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={pieces ?? 1}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setPieces(
                        Number.isNaN(value) ? 1 : Math.max(1, Math.floor(value))
                      );
                    }}
                    className="w-24 rounded-md border border-border px-3 py-2 text-center text-sm"
                    aria-label="Select pieces"
                  />
                </div>
              )}

              <div className="w-full flex-1">
                <label className="mb-2 block text-sm font-medium">
                  Message on cake
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="e.g. Happy Birthday!"
                  className="w-full rounded-md border border-border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="mb-2 block text-sm font-medium">
                Additional instructions
              </label>
              <textarea
                rows={3}
                value={additionalDescription}
                onChange={(event) =>
                  setAdditionalDescription(event.target.value)
                }
                placeholder="Allergies, delivery notes, or decoration details"
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                size="lg"
                type="button"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex flex-1 items-center justify-center gap-2 bg-[#C967AC] text-white hover:bg-[#bd5b9e] disabled:opacity-70"
              >
                <ShoppingCart className="h-4 w-4" />
                {isAddingToCart ? "Adding…" : "Add to Cart"}
              </Button>
            </div>

            {(cartError || cartSuccess) && (
              <p
                className={`text-sm ${
                  cartError ? "text-red-500" : "text-emerald-600"
                }`}
              >
                {cartError ?? cartSuccess}
              </p>
            )}

            <Card className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-4 text-lg font-semibold">Product Details</h3>

              <div className="grid gap-4 text-sm">
                <div className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center">
                  <span className="font-medium text-muted-foreground">
                    Category:
                  </span>
                  <span className="font-medium sm:text-right">
                    {categoryName || "—"}
                  </span>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center">
                  <span className="font-medium text-muted-foreground">
                    Type:
                  </span>
                  <span className="font-medium sm:text-right">
                    {subcategoryName || "—"}
                  </span>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center">
                  <span className="font-medium text-muted-foreground">
                    Availability:
                  </span>
                  <span className="font-medium text-green-600 sm:text-right">
                    In Stock
                  </span>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center">
                  <span className="font-medium text-muted-foreground">
                    Description:
                  </span>
                  <span className="font-medium sm:text-right">
                    {product.description || "—"}
                  </span>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Delivery times may vary depending on current workload. The
                    final decoration may differ slightly from the reference
                    image because each cake is handmade with care.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-bold md:text-2xl">Customer Reviews</h2>
            <Button
              onClick={() => setShowReviewForm((prev) => !prev)}
              disabled={isSubmittingReview}
              className="rounded-full bg-[#C967AC] px-4 py-2 text-white hover:bg-[#bd5b9e]"
            >
              + Add Review
            </Button>
          </div>

          {showReviewForm && (
            <div className="mb-8">
              <ReviewForm
                onSubmit={handleReviewSubmit}
                defaultRating={Math.max(1, ratingValue || 5)}
                isSubmitting={isSubmittingReview}
              />
              {reviewError && (
                <p className="mt-2 text-sm text-red-500">{reviewError}</p>
              )}
            </div>
          )}

          <ReviewsList reviews={reviews} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
        {relatedProducts.length ? (
          <div className="2xl:my-16 grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3 3xl:gap-10">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item._id}
                image={item.image_url || "/placeholder.svg"}
                name={item.name}
                description={
                  item.description ?? "Freshly made with premium ingredients."
                }
                price={computePriceLabel(item)}
                productId={item._id}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No related products available right now.
          </div>
        )}
      </section>
    </main>
  );
}
