"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { ReviewFilterDropdown } from "./ReviewFilterDropdown"
import { ReviewItemProfile } from "./ReviewItemProfile"

interface Review {
  id: string
  name: string
  title: string
  rating: number
  content: string
  initials: string
}

interface MyReviewsSectionProps {
  reviews: Review[]
}

export function MyReviewsSection({ reviews }: MyReviewsSectionProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const filteredReviews = selectedRating ? reviews.filter((r) => r.rating === selectedRating) : reviews

  return (
    <Card className="p-6 border-2 mt-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">My Reviews</h3>
        <p className="text-sm text-gray-600">My Response to products</p>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Filter by Reviews</p>
        <ReviewFilterDropdown onFilterChange={setSelectedRating} />
      </div>

      {filteredReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Star className="h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-600">No review yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewItemProfile key={review.id} {...review} />
          ))}
        </div>
      )}
    </Card>
  )
}
