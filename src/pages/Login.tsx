import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login, register, adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("mode") === "admin") {
      setIsAdmin(true);
      setIsRegister(false);
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Fill all fields"); return; }

    try {
      if (isAdmin) {
        const success = await adminLogin(email, password);
        if (success) { 
          toast.success("Welcome Admin!"); 
          navigate("/admin"); 
        } else {
          toast.error("Invalid admin credentials.");
        }
      } else if (isRegister) {
        if (!name) { toast.error("Enter your name"); return; }
        const success = await register(name, email, password);
        if (success) {
          toast.success("Account created!");
          navigate("/");
        } else {
          toast.error("Registration failed.");
        }
      } else {
        const success = await login(email, password);
        if (success) {
          toast.success("Welcome back!");
          navigate("/");
        } else {
          toast.error("Login failed. Check your credentials.");
        }
      }
    } catch (error) {
      toast.error("An error occurred during authentication.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_92%_50%/0.04),transparent_60%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="glass-card p-8">
          <div className="mb-6 flex flex-col items-center">
            <Link to="/" className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </Link>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {isAdmin ? "Admin Login" : isRegister ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isAdmin ? "Enter admin credentials" : isRegister ? "Join TrustCart today" : "Sign in to your account"}
            </p>
          </div>

          {/* Toggle tabs */}
          <div className="mb-6 flex gap-1 rounded-lg bg-secondary p-1">
            <button onClick={() => { setIsAdmin(false); setIsRegister(false); }} className={`flex-1 rounded-md py-2 text-xs font-medium transition-all ${!isAdmin && !isRegister ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              User Login
            </button>
            <button onClick={() => { setIsAdmin(false); setIsRegister(true); }} className={`flex-1 rounded-md py-2 text-xs font-medium transition-all ${isRegister ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              Register
            </button>
            <button onClick={() => { setIsAdmin(true); setIsRegister(false); }} className={`flex-1 rounded-md py-2 text-xs font-medium transition-all ${isAdmin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50" placeholder="Your name" />
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50" placeholder={isAdmin ? "admin@shop.com" : "you@email.com"} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 pr-10 text-sm text-foreground outline-none focus:border-primary/50" placeholder={isAdmin ? "admin123" : "••••••••"} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              {isAdmin ? "Admin Sign In" : isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
