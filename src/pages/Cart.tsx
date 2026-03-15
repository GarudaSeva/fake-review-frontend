import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h2 className="mt-4 font-heading text-xl font-bold text-foreground">Cart is empty</h2>
          <Link to="/" className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Shopping Cart</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item, i) => (
              <motion.div key={item.product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card flex gap-4 p-4">
                <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">{item.product.name}</h3>
                    <p className="text-lg font-bold text-foreground">${item.product.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2.5 py-1 text-muted-foreground hover:text-foreground"><Minus className="h-3 w-3" /></button>
                      <span className="text-sm font-medium text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2.5 py-1 text-muted-foreground hover:text-foreground"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card h-fit p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">Order Summary</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">Free</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-heading font-bold"><span>Total</span><span className="gradient-text">${totalPrice.toFixed(2)}</span></div>
            </div>
            <button onClick={() => { clearCart(); toast.success("Order placed! (Simulation)"); }} className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
