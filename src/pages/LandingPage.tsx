import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  ShoppingCart,
  Star,
  Brain,
  Eye,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Users,
  Bot,
  Sparkles,
} from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stats = [
  { value: "99.2%", label: "Fake Detection Rate", icon: Eye },
  { value: "50K+", label: "Reviews Analyzed", icon: BarChart3 },
  { value: "1,200+", label: "Bots Flagged", icon: Bot },
  { value: "98%", label: "User Trust Score", icon: Users },
];

const features = [
  {
    icon: Brain,
    title: "Sentiment Analysis",
    desc: "Every review is classified as Positive, Negative, or Neutral using NLP models with confidence scoring.",
    color: "text-[hsl(152,60%,42%)]",
    bg: "bg-[hsl(152,60%,42%)]/10",
    border: "border-[hsl(152,60%,42%)]/20",
  },
  {
    icon: Eye,
    title: "Fake Review Detection",
    desc: "AI flags suspicious patterns — spam language, repetitive text, and overly promotional content.",
    color: "text-[hsl(0,72%,51%)]",
    bg: "bg-[hsl(0,72%,51%)]/10",
    border: "border-[hsl(0,72%,51%)]/20",
  },
  {
    icon: Shield,
    title: "User Behavior Analysis",
    desc: "Tracks review frequency, account age, and posting patterns to classify users as Genuine, Suspicious, or Bot.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: TrendingUp,
    title: "Product Trust Score",
    desc: "A real-time trust metric calculated from review authenticity: Trust = 100 − Fake Review %.",
    color: "text-[hsl(210,80%,55%)]",
    bg: "bg-[hsl(210,80%,55%)]/10",
    border: "border-[hsl(210,80%,55%)]/20",
  },
];

const testimonials = [
  {
    name: "Rachel Green",
    role: "Verified Buyer",
    text: "Finally a platform where I can trust the reviews. The AI badges make it so easy to spot fake ones!",
    rating: 5,
  },
  {
    name: "Tom Wilson",
    role: "Tech Enthusiast",
    text: "The trust score on each product is a game changer. I saved money by avoiding products with inflated ratings.",
    rating: 5,
  },
  {
    name: "Lisa Park",
    role: "Frequent Shopper",
    text: "Love seeing the sentiment breakdown. Green for positive, red for negative — simple and effective.",
    rating: 4,
  },
];

export default function LandingPage() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 md:pt-24">
        {/* Ambient bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-[hsl(210,80%,55%)]/[0.03] blur-[100px]" />
        </div>

        <div className="container relative mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              AI-Powered Review Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mx-auto max-w-4xl font-heading text-5xl font-extrabold leading-[1.1] text-foreground md:text-7xl"
          >
            Shop Smarter with{" "}
            <span className="gradient-text">AI-Verified</span> Reviews
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Every review is analyzed in real-time for sentiment, authenticity, and
            suspicious behavior — so you only see reviews you can trust.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/products"
              className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(38_92%_50%/0.25)]"
            >
              Browse Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {!user && (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-8 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/30"
              >
                Create Account
              </Link>
            )}
          </motion.div>

          {/* Mini demo card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mx-auto mt-16 max-w-lg"
          >
            <div className="glass-card glow-border p-5 text-left">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    "Battery life is amazing and the camera quality blows my mind!"
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="badge-positive">✓ Positive</span>
                    <span className="badge-genuine">✓ Genuine</span>
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      Confidence: 92%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="border-y border-border/30 bg-card/30 py-12">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >
              <s.icon className="mx-auto mb-2 h-5 w-5 text-primary/60" />
              <p className="font-heading text-3xl font-extrabold text-foreground">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              How Our <span className="gradient-text">AI</span> Protects You
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Four layers of intelligent analysis run on every single review submitted to the platform.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`glass-card flex gap-5 p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_40px_hsl(38_92%_50%/0.05)]`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${f.bg} border ${f.border}`}
                >
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="border-y border-border/30 bg-card/20 px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center font-heading text-3xl font-bold text-foreground md:text-4xl"
          >
            How It <span className="gradient-text">Works</span>
          </motion.h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Submit a Review",
                desc: "Write your honest feedback on any product and hit submit.",
                icon: Zap,
              },
              {
                step: "02",
                title: "AI Analyzes Instantly",
                desc: "Sentiment, authenticity, and user behavior are scored in real-time.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Trust Badges Appear",
                desc: "Reviews are labeled so other shoppers know exactly what's genuine.",
                icon: CheckCircle2,
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card relative overflow-hidden p-6 text-center"
              >
                <span className="absolute -right-2 -top-4 font-heading text-7xl font-extrabold text-primary/[0.06]">
                  {s.step}
                </span>
                <div className="relative">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex items-end justify-between"
          >
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p className="mt-2 text-muted-foreground">Top-rated products with verified reviews</p>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(38_92%_50%/0.08)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute right-3 top-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            product.trustScore >= 90
                              ? "badge-genuine"
                              : product.trustScore >= 70
                              ? "badge-neutral"
                              : "badge-fake"
                          }`}
                        >
                          Trust: {product.trustScore}%
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {product.name}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3.5 w-3.5 ${
                              j < Math.floor(product.rating)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-heading text-xl font-bold text-foreground">
                          ${product.price}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            toast.success(`${product.name} added to cart`);
                          }}
                          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="border-t border-border/30 bg-card/20 px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center font-heading text-3xl font-bold text-foreground md:text-4xl"
          >
            What Shoppers <span className="gradient-text">Say</span>
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card p-6"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="glass-card glow-border relative overflow-hidden p-10 text-center md:p-16"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_92%_50%/0.06),transparent_70%)]" />
            <div className="relative">
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Ready to Shop with <span className="gradient-text">Confidence</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Join thousands of smart shoppers who rely on AI to filter out fake reviews and find genuinely great products.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/products"
                  className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(38_92%_50%/0.25)]"
                >
                  Start Shopping <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {!user && (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    or create a free account →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/30 px-4 py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-heading text-lg font-bold gradient-text">TrustCart</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 TrustCart. AI-Powered Review Intelligence Platform.
          </p>
          <div className="flex gap-6">
            <Link to="/products" className="text-xs text-muted-foreground hover:text-foreground">Products</Link>
            <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground">Login</Link>
            <Link to="/admin" className="text-xs text-muted-foreground hover:text-foreground">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
