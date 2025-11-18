"use client";

import { Review } from "@/lib/types/review";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RatingStars } from "./rating-stars";
import { Check, X } from "lucide-react";

interface ReviewCardProps {
  review: Review;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  isLoading?: boolean;
  showActions?: boolean;
}

export function ReviewCard({
  review,
  onApprove,
  onReject,
  isLoading = false,
  showActions = false,
}: ReviewCardProps) {
  return (
    <Card className="border-2 border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="pt-6 space-y-4">
        {/* Product Name with Stars */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-lg">{review.name}</h3>
          <RatingStars rating={review.rating} size={18} />
        </div>

        {/* Review Comment */}
        <p className="text-sm text-foreground leading-relaxed">
          {review.comment}
        </p>

        {/* Action Buttons */}
        {showActions && review.status === "pending" && (
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              className="flex-1 gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
              variant="outline"
              onClick={() => onReject?.(review._id)}
              disabled={isLoading}
            >
              <X size={16} />
              Reject
            </Button>
            <Button
              size="sm"
              className="flex-1 gap-2 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
              variant="outline"
              onClick={() => onApprove?.(review._id)}
              disabled={isLoading}
            >
              <Check size={16} />
              Approve
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
