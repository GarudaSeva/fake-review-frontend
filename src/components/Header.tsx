import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold gradient-text">TrustCart</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Products</Link>
          {user && !user.isAdmin && (
            <Link to="/my-reviews" className="text-sm text-muted-foreground transition-colors hover:text-foreground">My Reviews</Link>
          )}
          {user?.isAdmin && (
            <Link to="/admin" className="text-sm text-primary transition-colors hover:text-primary/80">Admin Panel</Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative rounded-lg border border-border/50 p-2 transition-colors hover:border-primary/30 hover:bg-secondary">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-muted-foreground md:block">{user.name}</span>
              <button onClick={logout} className="rounded-lg border border-border/50 p-2 transition-colors hover:border-destructive/30 hover:bg-destructive/10">
                <LogOut className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              <User className="h-4 w-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
