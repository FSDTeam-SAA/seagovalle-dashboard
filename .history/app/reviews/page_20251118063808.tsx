"use client";

import { Header } from "@/components/header";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { ReviewsPageContent } from "@/components/reviews/reviews-page-content";

export default function ReviewsPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header
          title="Reviews & Ratings"
          searchPlaceholder="Search reviews..."
        />
        <ReviewsPageContent />
      </div>
    </LayoutWrapper>
  );
}
