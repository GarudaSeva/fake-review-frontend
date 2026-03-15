import { useParams, Link } from "react-router-dom";
import { products, analyzeReview } from "@/data/mockData";
import { useReviews } from "@/context/ReviewContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { reviews, addReview } = useReviews();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  if (!product) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Product not found</p></div>;

  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleSubmitReview = async () => {
    if (!user) { toast.error("Please login to submit a review"); return; }
    if (!reviewText.trim()) { toast.error("Write a review first"); return; }

    setSubmitting(true);
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1000));

    const analysis = analyzeReview(reviewText);
    const newReview = {
      id: "r_" + Date.now(),
      userId: user.id,
      userName: user.name,
      productId: product.id,
      reviewText,
      rating,
      sentiment: analysis.sentiment.sentiment,
      sentimentConfidence: analysis.sentiment.confidence,
      fakeReviewLabel: analysis.fake_review_detection.review_label,
      fakeProbability: analysis.fake_review_detection.fake_probability,
      userStatus: analysis.user_status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    addReview(newReview);
    setReviewText("");
    setRating(5);
    setSubmitting(false);
    toast.success("Review analyzed and submitted!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card overflow-hidden">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${product.trustScore >= 90 ? "badge-genuine" : product.trustScore >= 70 ? "badge-neutral" : "badge-fake"}`}>
              Trust Score: {product.trustScore}%
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold text-foreground">{product.name}</h1>
            <div className="mt-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            <p className="mt-4 text-muted-foreground">{product.description}</p>
            <p className="mt-6 font-heading text-3xl font-bold text-foreground">${product.price}</p>
            <button
              onClick={() => { addToCart(product); toast.success("Added to cart!"); }}
              className="mt-6 flex w-fit items-center gap-2 rounded-xl bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </button>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-foreground">Reviews</h2>

          {/* Write Review */}
          <div className="mt-6 glass-card p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">Write a Review</h3>
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setRating(i + 1)}>
                  <Star className={`h-5 w-5 cursor-pointer transition-colors ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/30 hover:text-primary/50"}`} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Share your experience with this product..."
              className="mt-3 w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/50 min-h-[100px] resize-none"
            />
            <button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="mt-3 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? "Analyzing with AI..." : "Submit & Analyze Review"}
            </button>
          </div>

          {/* Review List */}
          <div className="mt-6 space-y-4">
            {productReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {productReviews.length === 0 && (
              <p className="py-10 text-center text-muted-foreground">No reviews yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
