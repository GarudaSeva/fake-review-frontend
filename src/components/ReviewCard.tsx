import { Star, AlertTriangle } from "lucide-react";
import { Review } from "@/data/mockData";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className={`glass-card p-4 ${review.fakeReviewLabel === "fake" ? "border-destructive/30" : ""}`}>
      {review.fakeReviewLabel === "fake" && (
        <div className="mb-2 flex items-center gap-1.5 badge-fake w-fit">
          <AlertTriangle className="h-3 w-3" /> ⚠ Suspicious Review
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="font-heading text-sm font-semibold text-foreground">{review.userName}</span>
        <span className="text-xs text-muted-foreground">{review.createdAt}</span>
      </div>
      <div className="mt-1 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
        ))}
      </div>
      <p className="mt-2 text-sm text-foreground/80">"{review.reviewText}"</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={review.sentiment === "positive" ? "badge-positive" : review.sentiment === "negative" ? "badge-negative" : "badge-neutral"}>
          Sentiment: {review.sentiment}
        </span>
        <span className={review.userStatus === "genuine" ? "badge-genuine" : "badge-fake"}>
          Status: {review.userStatus}
        </span>
      </div>
    </div>
  );
}
