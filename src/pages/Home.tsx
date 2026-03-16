import { Product } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Search, Sparkles } from "lucide-react";
import { API_BASE_URL } from "@/api";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        // Map _id from backend to id for frontend
        const mappedData = data.map((p: any) => ({
          ...p,
          id: p._id
        }));
        setProducts(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50 px-4 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="container relative mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">AI-Powered Review Analysis</span>
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Shop with <span className="gradient-text">Trust</span>
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Every review is analyzed by AI to detect fakes, analyze sentiment, and identify suspicious behavior.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mx-auto mt-8 max-w-md">
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-2.5 backdrop-blur-sm focus-within:border-primary/30">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No products found.</p>
        )}
      </section>
    </div>
  );
}
