"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  role: "admin" | "user" | "customer";
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  isLoggedIn: boolean;
  login: (
    userData: User,
    tokens?: { accessToken: string; refreshToken?: string }
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Restore user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (
    userData: User,
    tokens?: { accessToken: string; refreshToken?: string }
  ) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (tokens) {
      localStorage.setItem("accessToken", tokens.accessToken);
      if (tokens.refreshToken)
        localStorage.setItem("refreshToken", tokens.refreshToken);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
