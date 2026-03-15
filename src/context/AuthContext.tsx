import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  adminLogin: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, _password: string) => {
    setUser({ id: "u_" + Date.now(), name: email.split("@")[0], email, isAdmin: false });
    return true;
  };

  const register = (name: string, email: string, _password: string) => {
    setUser({ id: "u_" + Date.now(), name, email, isAdmin: false });
    return true;
  };

  const adminLogin = (email: string, password: string) => {
    if (email === "admin@shop.com" && password === "admin123") {
      setUser({ id: "admin_1", name: "Admin", email, isAdmin: true });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
