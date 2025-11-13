"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ReviewFormProps {
  onSubmit: (payload: {
    rating: number;
    comment: string;
    name?: string;
  }) => void;
  defaultRating?: number;
  isSubmitting?: boolean;
}

export function ReviewForm({
  onSubmit,
  defaultRating = 5,
  isSubmitting = false,
}: ReviewFormProps) {
  const [rating, setRating] = useState(defaultRating);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setRating(defaultRating);
  }, [defaultRating]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ rating, comment, name: name.trim() || undefined });
    setName("");
    setComment("");
    setRating(defaultRating);
  };

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name or nickname"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-colors"
                disabled={isSubmitting}
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Review</label>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tell us about the cake, taste, delivery, design..."
            rows={4}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting…" : "Submit Review"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setName("");
              setComment("");
              setRating(defaultRating);
            }}
            disabled={isSubmitting}
            className="border-border bg-transparent text-sm"
          >
            Clear
          </Button>
        </div>
      </form>
    </Card>
  );
}
