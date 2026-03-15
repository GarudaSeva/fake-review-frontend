import Header from "@/components/Header";
import { useReviews } from "@/context/ReviewContext";
import { useAuth } from "@/context/AuthContext";
import ReviewCard from "@/components/ReviewCard";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

export default function MyReviews() {
  const { reviews } = useReviews();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-muted-foreground">Please login to see your reviews.</p>
          <Link to="/login" className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">Login</Link>
        </div>
      </div>
    );
  }

  const myReviews = reviews.filter(r => r.userId === user.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">My Reviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">Reviews you've written and their AI analysis results</p>

        <div className="mt-6 space-y-4">
          {myReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {myReviews.length === 0 && (
            <div className="flex flex-col items-center py-20">
              <MessageSquare className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-3 text-muted-foreground">You haven't written any reviews yet.</p>
              <Link to="/" className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">Browse Products</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
