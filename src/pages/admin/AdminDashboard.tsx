import AdminLayout from "@/components/AdminLayout";
import { Product } from "@/data/mockData";
import { Package, MessageSquare, AlertTriangle, ShieldCheck, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/api";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: "hsl(40,20%,70%)", font: { family: "DM Sans" } } },
  },
  scales: {
    x: { ticks: { color: "hsl(220,10%,50%)" }, grid: { color: "hsl(220,14%,12%)" } },
    y: { ticks: { color: "hsl(220,10%,50%)" }, grid: { color: "hsl(220,14%,12%)" } },
  },
};

const pieOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: "hsl(40,20%,70%)", font: { family: "DM Sans" } } } },
};

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState<any>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, prodRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/stats`),
          fetch(`${API_BASE_URL}/products`)
        ]);

        const stats = await statsRes.json();
        const prods = await prodRes.json();

        setStatsData(stats);
        setProductsList(prods.map((p: any) => ({ ...p, id: p._id })));
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !statsData) return <AdminLayout><div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div></AdminLayout>;

  const { sentiment, authenticity, totalReviews } = statsData;
  const fakePercent = totalReviews > 0 ? Math.round((authenticity.fake / totalReviews) * 100) : 0;
  const genuinePercent = 100 - fakePercent;
  const posPercent = totalReviews > 0 ? Math.round((sentiment.positive / totalReviews) * 100) : 0;
  const negPercent = totalReviews > 0 ? Math.round((sentiment.negative / totalReviews) * 100) : 0;

  const stats = [
    { label: "Total Products", value: statsData.totalProducts, icon: Package, color: "text-info" },
    { label: "Total Reviews", value: totalReviews, icon: MessageSquare, color: "text-primary" },
    { label: "Fake Reviews", value: `${fakePercent}%`, icon: AlertTriangle, color: "text-destructive" },
    { label: "Genuine Reviews", value: `${genuinePercent}%`, icon: ShieldCheck, color: "text-success" },
    { label: "Positive Sentiment", value: `${posPercent}%`, icon: TrendingUp, color: "text-success" },
    { label: "Negative Sentiment", value: `${negPercent}%`, icon: TrendingDown, color: "text-destructive" },
  ];

  const sentimentChartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [{ data: [sentiment.positive, sentiment.negative, sentiment.neutral], backgroundColor: ["hsl(152,60%,42%)", "hsl(0,72%,51%)", "hsl(220,10%,50%)"], borderWidth: 0 }],
  };

  const fakeChartData = {
    labels: ["Real", "Fake"],
    datasets: [{ label: "Reviews", data: [authenticity.real, authenticity.fake], backgroundColor: ["hsl(152,60%,42%)", "hsl(0,72%,51%)"], borderWidth: 0, borderRadius: 8 }],
  };


  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">AI Review Analysis Overview</p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stat-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="font-heading text-sm font-semibold text-foreground">Sentiment Distribution</h3>
          <div className="mx-auto mt-4 max-w-[280px]"><Pie data={sentimentChartData} options={pieOptions} /></div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-heading text-sm font-semibold text-foreground">Fake vs Real Reviews</h3>
          <div className="mt-4"><Bar data={fakeChartData} options={chartOptions} /></div>
        </div>
      </div>

      {/* Product Trust Scores */}
      <div className="mt-8 glass-card p-6">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Product Trust Scores</h3>
        <div className="space-y-3">
          {productsList.map(p => (
            <div key={p.id} className="flex items-center gap-4">
              <span className="w-40 text-sm text-foreground truncate">{p.name}</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${p.trustScore >= 90 ? "bg-success" : p.trustScore >= 70 ? "bg-primary" : "bg-destructive"}`} style={{ width: `${p.trustScore}%` }} />
              </div>
              <span className="text-sm font-mono text-muted-foreground w-12 text-right">{p.trustScore}%</span>
            </div>
          ))}
          {productsList.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No products yet.</p>}
        </div>
      </div>
    </AdminLayout>
  );
}
