import AdminLayout from "@/components/AdminLayout";
import { suspiciousUsers } from "@/data/mockData";
import { AlertTriangle, Bot, UserX } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSuspiciousUsers() {
  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground">Suspicious Users</h1>
      <p className="mt-1 text-sm text-muted-foreground">Users flagged by the AI behavior detection system</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Total Flagged</span>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">{suspiciousUsers.length}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Suspicious</span>
          <p className="mt-2 font-heading text-2xl font-bold text-primary">{suspiciousUsers.filter(u => u.status === "suspicious").length}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Bots Detected</span>
          <p className="mt-2 font-heading text-2xl font-bold text-destructive">{suspiciousUsers.filter(u => u.status === "bot").length}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-muted-foreground">Avg Reviews/Day</span>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">{Math.round(suspiciousUsers.reduce((s, u) => s + u.reviewsPerDay, 0) / suspiciousUsers.length)}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Reviews/Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Account Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousUsers.map(user => (
                <tr key={user.id} className="border-b border-border/30 hover:bg-secondary/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === "bot" ? <Bot className="h-4 w-4 text-destructive" /> : <UserX className="h-4 w-4 text-primary" />}
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold text-destructive">{user.reviewsPerDay}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.accountAge} days</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 ${user.status === "bot" ? "badge-fake" : "badge-neutral"}`}>
                      {user.status === "bot" && <AlertTriangle className="h-3 w-3" />}
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
