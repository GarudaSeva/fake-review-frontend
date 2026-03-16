import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Upload, Loader2, ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "@/api";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("public");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setDescription(data.description || "");
          setPrice(data.price.toString());
          setImage(data.image || "");
          setStatus(data.status || "public");
        } else {
          toast.error("Failed to fetch product details");
          navigate("/admin/products");
        }
      } catch (err) {
        toast.error("Connection error");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price) { toast.error("Fill all required fields"); return; }
    
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          description, 
          price: parseFloat(price), 
          image,
          status 
        })
      });

      if (response.ok) {
        toast.success(`Product "${name}" updated successfully!`);
        navigate("/admin/products");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update product");
      }
    } catch (err) {
      toast.error("Connection error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <AdminLayout><div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <button onClick={() => navigate("/admin/products")} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </button>
      
      <h1 className="font-heading text-2xl font-bold text-foreground">Edit Product</h1>
      <p className="mt-1 text-sm text-muted-foreground">Modify product details and visibility</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-5">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Product Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50" placeholder="e.g. Galaxy Pro Max" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Description *</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/50 min-h-[100px] resize-none" placeholder="Product description..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Price ($) *</label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50" placeholder="99.99" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Visibility Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
            >
              <option value="public">Public</option>
              <option value="private">Private (Hidden)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Product Image URL</label>
          <div className="flex items-center gap-3">
            <input value={image} onChange={e => setImage(e.target.value)} className="flex-1 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50" placeholder="https://..." />
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
              <Upload className="h-4 w-4" />
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={submitting}
          className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Update Product"}
        </button>
      </form>
    </AdminLayout>
  );
}
