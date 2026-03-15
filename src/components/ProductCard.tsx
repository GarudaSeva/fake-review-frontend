import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(38_92%_50%/0.08)]">
          <div className="relative aspect-square overflow-hidden bg-secondary/30">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute right-2 top-2">
              <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                product.trustScore >= 90 ? "badge-genuine" : product.trustScore >= 70 ? "badge-neutral" : "badge-fake"
              }`}>
                Trust: {product.trustScore}%
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-1">{product.name}</h3>
            <div className="mt-1 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-foreground">${product.price}</span>
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ShoppingCart className="h-3 w-3" /> Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
