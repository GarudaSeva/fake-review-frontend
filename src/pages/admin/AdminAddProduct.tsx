import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { API_BASE_URL } from "@/api";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price) { toast.error("Fill all required fields"); return; }
    
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: parseFloat(price), image })
      });

      if (response.ok) {
        toast.success(`Product "${name}" added successfully!`);
        setName(""); setDescription(""); setPrice(""); setImage("");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to add product");
      }
    } catch (err) {
      toast.error("Connection error");
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground">Add Product</h1>
      <p className="mt-1 text-sm text-muted-foreground">Add a new product to the catalog</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-5">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Product Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50" placeholder="e.g. Galaxy Pro Max" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Description *</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/50 min-h-[100px] resize-none" placeholder="Product description..." />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Price *</label>
          <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50" placeholder="99.99" />
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
        <button type="submit" className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Add Product
        </button>
      </form>
    </AdminLayout>
  );
}
