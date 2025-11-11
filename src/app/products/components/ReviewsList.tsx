import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { ProductReview } from "@/app/types/product";

interface ReviewsListProps {
  reviews?: ProductReview[];
}

const getInitials = (input?: string) => {
  if (!input) return "?";
  const trimmed = input.trim();
  if (!trimmed) return "?";
  return (
    trimmed
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "?"
  );
};

const formatDate = (date?: string) => {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function ReviewsList({ reviews }: ReviewsListProps) {
  const list = reviews ?? [];

  return (
    <div className="relative">
      <div className="mt-6 space-y-4">
        {list.length === 0 ? (
          <div className="rounded-lg border border-border bg-white p-8 text-center">
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review! 🍰
            </p>
          </div>
        ) : (
          list.map((review) => {
            const ratingValue = Math.max(0, Math.min(5, review.rating ?? 0));
            const displayName = review.name ?? review.user_id ?? "Anonymous";
            const avatar = getInitials(displayName);
            const subtitle = formatDate(review.created_at);

            return (
              <Card
                key={review._id}
                className="rounded-lg border border-border p-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-semibold">
                        {avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-[#C967AC]">
                          {displayName}
                        </p>
                        {subtitle && (
                          <p className="text-xs text-muted-foreground">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < ratingValue
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-xs leading-relaxed text-foreground md:text-sm">
                      {review.comment}
                    </p>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
