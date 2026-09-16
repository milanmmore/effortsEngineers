"use client";
import { createContext, useState, useEffect } from "react";
import API from "@/lib/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const decodeToken = (token) => {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("Invalid token");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setUser({ ...decodeToken(token), token });
    } catch {
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { token, user: authenticatedUser } = res.data;
    localStorage.setItem("token", token);
    setUser({ ...authenticatedUser, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
