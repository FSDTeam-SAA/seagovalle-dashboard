"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewFilters } from "@/components/reviews/review-filters";
import {
  ReviewAnalyticsWidget,
  RatingBreakdown,
} from "@/components/reviews/review-analytics";
import {
  useGetAllReviewsAdmin,
  useGetReviewsAnalytics,
  useApproveReview,
  useRejectReview,
} from "@/lib/hooks";
import { ReviewFilterParams } from "@/lib/types/review";

export function ReviewsPageContent() {
  const [filters, setFilters] = useState<ReviewFilterParams>({});
  const [currentPage, setCurrentPage] = useState(1);

  const { data: analyticsData, isLoading: analyticsLoading } =
    useGetReviewsAnalytics();
  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetAllReviewsAdmin({
      ...filters,
      page: currentPage,
      limit: 10,
    });

  const approveReview = useApproveReview();
  const rejectReview = useRejectReview();

  const handleFilterChange = (newFilters: ReviewFilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleApprove = (id: string) => {
    approveReview.mutate(id);
  };

  const handleReject = (id: string) => {
    rejectReview.mutate(id);
  };

  const reviews = reviewsData?.reviews || [];
  const meta = reviewsData?.meta;
  const totalPages = meta?.totalPages || 1;

  return (
    <div className="p-6 space-y-6">
      <p className="text-muted-foreground">
        Welcome back! Here's what's happening with your reviews today.
      </p>

      {/* Analytics Cards */}
      {analyticsData && !analyticsLoading && (
        <ReviewAnalyticsWidget analytics={analyticsData} />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ReviewFilters
            onFiltersChange={handleFilterChange}
            onSearch={(query) =>
              handleFilterChange({ ...filters, search: query })
            }
          />
        </div>

        {/* Reviews List and Rating Breakdown */}
        <div className="lg:col-span-3 space-y-6">
          {/* Rating Distribution */}
          {analyticsData && !analyticsLoading && (
            <RatingBreakdown analytics={analyticsData} />
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviewsLoading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No reviews found</p>
              </div>
            ) : (
              <>
                {reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    showActions={review.status === "pending"}
                    isLoading={
                      approveReview.isPending || rejectReview.isPending
                    }
                  />
                ))}
              </>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-4 border-t">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                ← Previous
              </Button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const page = idx + 1;
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!showPage && page === currentPage - 2) {
                    return <span key="dots-before">...</span>;
                  }
                  if (!showPage && page === currentPage + 2) {
                    return <span key="dots-after">...</span>;
                  }

                  if (!showPage) return null;

                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
