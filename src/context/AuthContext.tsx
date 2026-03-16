import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { API_BASE_URL } from "@/api";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  status: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const refreshStatus = async () => {
    const savedUserStr = localStorage.getItem("user");
    if (!savedUserStr) return;
    const savedUser = JSON.parse(savedUserStr);
    
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/status/${savedUser.id}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.status !== savedUser.status) {
          const updatedUser = { ...savedUser, status: data.status };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    } catch (e) {
      console.error("Failed to refresh status", e);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!resp.ok) return false;
      const data = await resp.json();
      const authUser = {
        id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.role === "admin",
        status: data.status
      };
      setUser(authUser);
      localStorage.setItem("user", JSON.stringify(authUser));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      if (!resp.ok) return false;
      const data = await resp.json();
      const authUser = {
        id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.role === "admin",
        status: data.status
      };
      setUser(authUser);
      localStorage.setItem("user", JSON.stringify(authUser));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const adminLogin = async (email: string, password: string) => {
    return await login(email, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, adminLogin, logout, refreshStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
