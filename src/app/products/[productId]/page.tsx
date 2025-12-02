"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReviewForm } from "../components/ReviewForm";
import { ProductDetails } from "../components/ProductDetails";
import dynamic from "next/dynamic";
import {
  createProductReview,
  getProductById,
} from "@/app/services/productService";
import { addToCart, type AddToCartPayload } from "@/app/services/cartService";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import type { ProductDetail, ProductSummary } from "@/app/types/product";
import ProductCard from "@/components/ProductCard";
import LoadingState from "@/components/LoadingState";

const ProductGallery = dynamic(() =>
  import("../components/ProductGallery").then((mod) => mod.ProductGallery)
);

const ReviewsList = dynamic(() =>
  import("../components/ReviewsList").then((mod) => mod.ReviewsList)
);
const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ??
  "https://backend-om79.onrender.com";

const currencyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

const resolveImageUrl = (path?: string) => {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${ASSET_BASE_URL}${path}`;
};

export default function ProductPage() {
  const params = useParams<{ productId: string }>();
  const { refreshCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductSummary[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

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
          images: data.images
            ?.map((img) => resolveImageUrl(img))
            .filter((img): img is string => !!img),
          related_products: related.map((item) => ({
            ...item,
            image_url: resolveImageUrl(item.image_url),
            images: item.images
              ?.map((img) => resolveImageUrl(img))
              .filter((img): img is string => !!img),
          })),
          reviews: normalizedReviews,
        };

        setProduct(resolvedProduct);
        setRelatedProducts(resolvedProduct.related_products);
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
    // Prioritize images array, fallback to single image_url
    if (product?.images && product.images.length > 0) {
      return product.images;
    }
    if (product?.image_url) {
      return [product.image_url];
    }
    return [];
  }, [product?.images, product?.image_url]);

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
    return <LoadingState message="Loading product details…" />;
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
  }: {
    rating: number;
    comment: string;
    name?: string;
  }) => {
    if (!productId) {
      setReviewError("Missing product identifier.");
      return;
    }

    if (!user?.id) {
      setReviewError("Please login to submit a review.");
      return;
    }

    try {
      setIsSubmittingReview(true);
      setReviewError(null);

      const payload = {
        user_id: user.id,
        product_id: productId,
        rating,
        comment,
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
          <Suspense
            fallback={
              <LoadingState
                message="Loading gallery…"
                fullScreen={false}
                className="min-h-[320px]"
              />
            }
          >
            <ProductGallery images={galleryImages} name={product.name} />
          </Suspense>

          <ProductDetails product={product} onCartUpdate={refreshCart} />
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-bold md:text-2xl">Customer Reviews</h2>
            <Button
              onClick={() => setShowReviewForm((prev) => !prev)}
              disabled={isSubmittingReview}
              className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
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

          <Suspense
            fallback={
              <LoadingState
                message="Loading reviews…"
                fullScreen={false}
                className="py-12"
              />
            }
          >
            <ReviewsList reviews={reviews} />
          </Suspense>
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
