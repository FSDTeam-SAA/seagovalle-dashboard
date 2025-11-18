"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewAnalyticsWidget } from "@/components/reviews/review-analytics";
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
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your app today.
        </p>
      </div>

      {/* Analytics Cards */}
      {analyticsData && !analyticsLoading && (
        <ReviewAnalyticsWidget analytics={analyticsData} />
      )}

      {/* Horizontal Filter Tabs */}
      <div className="flex gap-2 border-b pb-4 flex-wrap">
        <Button
          size="sm"
          variant={!filters.status ? "default" : "ghost"}
          onClick={() => handleFilterChange({})}
          className="font-medium"
        >
          All Reviews
        </Button>
        <Button
          size="sm"
          variant={filters.status === "pending" ? "default" : "ghost"}
          onClick={() => handleFilterChange({ status: "pending" })}
          className="font-medium"
        >
          Pending ({analyticsData?.pendingReviewsAnalysis || 0})
        </Button>
        <Button
          size="sm"
          variant={filters.status === "approved" ? "default" : "ghost"}
          onClick={() => handleFilterChange({ status: "approved" })}
          className="font-medium"
        >
          Approved ({analyticsData?.approvedReviewAnalysis || 0})
        </Button>
        <Button
          size="sm"
          variant={filters.rating === 5 ? "default" : "ghost"}
          onClick={() => handleFilterChange({ rating: 5 })}
          className="font-medium"
        >
          5 Stars
        </Button>
      </div>

      {/* Reviews Grid */}
      <div className="space-y-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  showActions={review.status === "pending"}
                  isLoading={approveReview.isPending || rejectReview.isPending}
                />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ← Previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage && page === currentPage - 2) {
                  return (
                    <span
                      key="dots-before"
                      className="px-2 text-muted-foreground"
                    >
                      ...
                    </span>
                  );
                }
                if (!showPage && page === currentPage + 2) {
                  return (
                    <span
                      key="dots-after"
                      className="px-2 text-muted-foreground"
                    >
                      ...
                    </span>
                  );
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
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
