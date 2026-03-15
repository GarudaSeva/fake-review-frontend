import AdminLayout from "@/components/AdminLayout";
import { products } from "@/data/mockData";
import { useReviews } from "@/context/ReviewContext";
import { Link } from "react-router-dom";
import { Eye, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProducts() {
  const { reviews } = useReviews();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage products and view trust scores</p>
        </div>
        <Link to="/admin/add-product" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Add Product</Link>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Reviews</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Fake Reviews</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Trust Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const prodReviews = reviews.filter(r => r.productId === product.id);
                const fakeCount = prodReviews.filter(r => r.fakeReviewLabel === "fake").length;
                return (
                  <tr key={product.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                        <span className="text-sm font-medium text-foreground">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">${product.price}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{prodReviews.length}</td>
                    <td className="px-6 py-4"><span className={fakeCount > 0 ? "badge-fake" : "badge-genuine"}>{fakeCount}</span></td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-mono font-bold ${product.trustScore >= 90 ? "text-success" : product.trustScore >= 70 ? "text-primary" : "text-destructive"}`}>
                        {product.trustScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link to={`/admin/product-report/${product.id}`} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-primary hover:border-primary/30">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-info hover:border-info/30"><Edit className="h-4 w-4" /></button>
                        <button className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-destructive hover:border-destructive/30"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
