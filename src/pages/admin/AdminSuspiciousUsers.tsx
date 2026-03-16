import AdminLayout from "@/components/AdminLayout";
import { AlertTriangle, Bot, UserX, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/api";

export default function AdminSuspiciousUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/admin/users`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      }
    } catch (err) {
      console.error("Error fetching admin users:", err);
      toast.error("Failed to load user analysis");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "genuine" ? "suspicious" : "genuine";
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Review access ${newStatus === "suspicious" ? "disabled" : "granted"} successfully`);
        fetchData();
      } else {
        toast.error("Failed to update user status");
      }
    } catch (err) {
      toast.error("Connection error");
    }
  };

  if (loading) return <AdminLayout><div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground">User Management</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage user permissions and review AI behavioral flags</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Total Users</span>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">{users.length}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Flagged Suspicious</span>
          <p className="mt-2 font-heading text-2xl font-bold text-primary">{users.filter(u => u.status === "suspicious").length}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Bots Detected</span>
          <p className="mt-2 font-heading text-2xl font-bold text-destructive">{users.filter(u => u.status === "bot").length}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Blocked Access</span>
          <p className="mt-2 font-heading text-2xl font-bold text-destructive">{users.filter(u => u.status !== "genuine").length}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">User (Email)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Reviews</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Flag Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{user.userName}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{user.email || user.userId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                       <span className="text-sm font-mono font-bold text-foreground">{user.reviewCount || 0} reviews</span>
                       <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                           <div 
                            className={`h-full rounded-full ${user.fakeCount > 0 ? "bg-destructive" : "bg-success"}`} 
                            style={{ width: `${user.reviewCount > 0 ? (user.fakeCount / user.reviewCount) * 100 : 0}%` }} 
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{user.fakeCount || 0} fake</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-foreground bg-secondary/50 px-2 py-1 rounded">
                      {user.reason || "AI Behavioral Flag"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${user.status === "bot" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                       {user.status === "bot" ? <Bot className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                       {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleToggleStatus(user.userId, user.status)}
                      className="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20 flex items-center gap-1"
                    >
                      <UserX className="h-3 w-3 rotate-180" />
                      Verify & Add User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center py-10 text-muted-foreground">No users found.</p>}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
