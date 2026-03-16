import AdminLayout from "@/components/AdminLayout";
import { useParams, Link } from "react-router-dom";
import { Product, Review } from "@/data/mockData";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/api";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const chartOpts = {
  responsive: true,
  plugins: { legend: { labels: { color: "hsl(40,20%,70%)", font: { family: "DM Sans" } } } },
  scales: { x: { ticks: { color: "hsl(220,10%,50%)" }, grid: { color: "hsl(220,14%,12%)" } }, y: { ticks: { color: "hsl(220,10%,50%)" }, grid: { color: "hsl(220,14%,12%)" } } },
};
const pieOpts = { responsive: true, plugins: { legend: { labels: { color: "hsl(40,20%,70%)", font: { family: "DM Sans" } } } } };

export default function AdminReviewReport() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [prodReviews, setProdReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, revRes] = await Promise.all([
        fetch(`${API_BASE_URL}/products/${id}`),
        fetch(`${API_BASE_URL}/products/${id}/reviews`)
      ]);
      const prodData = await prodRes.json();
      const revData = await revRes.json();
      
      if (prodRes.ok) setProduct({ ...prodData, id: prodData._id });
      if (revRes.ok) setProdReviews(revData.map((r: any) => ({ ...r, id: r._id })));
    } catch (err) {
      console.error("Error fetching report data:", err);
      toast.error("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Delete this review? This will also update product ratings.")) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Review deleted");
        setProdReviews(prodReviews.filter(r => r.id !== reviewId));
        // Refresh product data to update trust score/rating
        const prodRes = await fetch(`${API_BASE_URL}/products/${id}`);
        const prodData = await prodRes.json();
        if (prodRes.ok) setProduct({ ...prodData, id: prodData._id });
      } else {
        toast.error("Failed to delete review");
      }
    } catch (err) {
      toast.error("Connection error");
    }
  };

  if (loading) return <AdminLayout><div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div></AdminLayout>;
  if (!product) return <AdminLayout><p className="text-muted-foreground">Product not found</p></AdminLayout>;

  const fakeCount = prodReviews.filter(r => r.fakeReviewLabel === "fake").length;
  const realCount = prodReviews.length - fakeCount;
  const posCount = prodReviews.filter(r => r.sentiment === "positive").length;
  const negCount = prodReviews.filter(r => r.sentiment === "negative").length;
  const neuCount = prodReviews.filter(r => r.sentiment === "neutral").length;
  const suspiciousCount = prodReviews.filter(r => r.userStatus !== "genuine").length;

  return (
    <AdminLayout>
      <Link to="/admin/products" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>
      <h1 className="font-heading text-2xl font-bold text-foreground">{product.name} — Review Report</h1>
      <p className="mt-1 text-sm text-muted-foreground">{prodReviews.length} reviews · {suspiciousCount} suspicious users</p>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="font-heading text-sm font-semibold text-foreground">Fake vs Real</h3>
          <div className="mt-4">
            <Bar data={{ labels: ["Real", "Fake"], datasets: [{ label: "Reviews", data: [realCount, fakeCount], backgroundColor: ["hsl(152,60%,42%)", "hsl(0,72%,51%)"], borderWidth: 0, borderRadius: 8 }] }} options={chartOpts} />
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-heading text-sm font-semibold text-foreground">Sentiment</h3>
          <div className="mx-auto mt-4 max-w-[250px]">
            <Pie data={{ labels: ["Positive", "Negative", "Neutral"], datasets: [{ data: [posCount, negCount, neuCount], backgroundColor: ["hsl(152,60%,42%)", "hsl(0,72%,51%)", "hsl(220,10%,50%)"], borderWidth: 0 }] }} options={pieOpts} />
          </div>
        </div>
      </div>

      {/* Review Table */}
      <div className="mt-8 glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Review</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Sentiment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Fake/Real</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prodReviews.map(r => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-secondary/30">
                  <td className="px-4 py-3 text-sm text-foreground">{r.userName}</td>
                  <td className="px-4 py-3 text-sm text-foreground/70 max-w-[300px] truncate">{r.reviewText}</td>
                  <td className="px-4 py-3"><span className={r.sentiment === "positive" ? "badge-positive" : r.sentiment === "negative" ? "badge-negative" : "badge-neutral"}>{r.sentiment}</span></td>
                  <td className="px-4 py-3"><span className={r.fakeReviewLabel === "real" ? "badge-genuine" : "badge-fake"}>{r.fakeReviewLabel}</span></td>
                  <td className="px-4 py-3"><span className={r.userStatus === "genuine" ? "badge-genuine" : "badge-fake"}>{r.userStatus}</span></td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => handleDeleteReview(r.id)}
                      className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-destructive hover:border-destructive/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {prodReviews.length === 0 && <p className="text-center py-10 text-muted-foreground">No reviews found.</p>}
        </div>
      </div>
    </AdminLayout>
  );
}
