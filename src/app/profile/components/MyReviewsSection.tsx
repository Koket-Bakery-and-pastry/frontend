"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { ReviewFilterDropdown } from "./ReviewFilterDropdown";

interface Rating {
  product: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  created_at: string;
}

interface MyReviewsSectionProps {
  reviews: Rating[];
}

export function MyReviewsSection({ reviews }: MyReviewsSectionProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="py-6 border-2 mt-6">
      <div className="mb-3 px-6">
        <h3 className="text-xl font-bold mb-1">My Reviews</h3>
        <p className="text-sm text-gray-600">My Response to products</p>
      </div>

      <div className="mb-3 px-6">
        <p className="text-sm font-medium mb-3">Filter by Reviews</p>
        <ReviewFilterDropdown onFilterChange={setSelectedRating} />
      </div>

      {filteredReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Star className="h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-600">No review yet</p>
        </div>
      ) : (
        <div className="space-y-4 px-2 md:px-6">
          {filteredReviews.map((review, index) => (
            <Card key={index} className="p-4 border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.product.name}</h4>
                  <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
