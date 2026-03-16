import { API_BASE_URL } from "@/api";
import { useParams, Link } from "react-router-dom";
import { Product, Review } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { Star, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user, refreshStatus } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) refreshStatus();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Product
        const prodRes = await fetch(`${API_BASE_URL}/products/${id}`);
        const prodData = await prodRes.json();
        
        if (prodRes.ok) {
          setProduct({ ...prodData, id: prodData._id });
        }

        // Fetch Reviews
        const revRes = await fetch(`${API_BASE_URL}/products/${id}/reviews`);
        const revData = await revRes.json();
        
        if (revRes.ok) {
          setProductReviews(revData.map((r: any) => ({ ...r, id: r._id })));
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!user) { toast.error("Please login to submit a review"); return; }
    if (!reviewText.trim()) { toast.error("Write a review first"); return; }
    if (!id) return;

    setSubmitting(true);
    try {
      const payload = {
        productId: id,
        review: reviewText,
        rating,
        user: {
          id: user.id || "anonymous",
          name: user.name || "Guest",
          reviews_per_day: 3, // Mock metadata for ML analyzer
          account_age_days: 200 // Mock metadata for ML analyzer
        }
      };

      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setProductReviews([{ ...data, id: data._id }, ...productReviews]);
        setReviewText("");
        setRating(5);
        toast.success("Review analyzed and submitted!");
        
        // Refresh product stats
        const prodRes = await fetch(`${API_BASE_URL}/products/${id}`);
        const prodData = await prodRes.json();
        if (prodRes.ok) setProduct({ ...prodData, id: prodData._id });
      } else {
        toast.error(data.error || "Failed to submit review");
      }
    } catch (err) {
      toast.error("Connection error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
  if (!product) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Product not found</p></div>;

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
            {user?.status && (user.status === "suspicious" || user.status === "bot") ? (
              <div className="mt-4 rounded-lg bg-destructive/10 p-4 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">
                  Reviewing is disabled for your account due to suspicious activity. 
                  Please contact support if you believe this is a mistake.
                </p>
              </div>
            ) : (
              <>
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
              </>
            )}
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
