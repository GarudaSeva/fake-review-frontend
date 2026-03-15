import AdminLayout from "@/components/AdminLayout";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { useReviews } from "@/context/ReviewContext";
import { ArrowLeft } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const chartOpts = {
  responsive: true,
  plugins: { legend: { labels: { color: "hsl(40,20%,70%)", font: { family: "DM Sans" } } } },
  scales: { x: { ticks: { color: "hsl(220,10%,50%)" }, grid: { color: "hsl(220,14%,12%)" } }, y: { ticks: { color: "hsl(220,10%,50%)" }, grid: { color: "hsl(220,14%,12%)" } } },
};
const pieOpts = { responsive: true, plugins: { legend: { labels: { color: "hsl(40,20%,70%)", font: { family: "DM Sans" } } } } };

export default function AdminReviewReport() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { reviews } = useReviews();

  if (!product) return <AdminLayout><p className="text-muted-foreground">Product not found</p></AdminLayout>;

  const prodReviews = reviews.filter(r => r.productId === product.id);
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
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
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
                  <td className="px-4 py-3 text-xs text-muted-foreground">{r.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
