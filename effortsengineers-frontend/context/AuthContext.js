"use client";
import { createContext, useState, useEffect } from "react";
import API from "@/lib/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const handleSessionExpired = () => {
      setUser(null);
      window.location.replace("/auth/login");
    };
    window.addEventListener("ee:session-expired", handleSessionExpired);
    API.get("/auth/profile")
      .then((response) => { if (active) setUser(response.data?.user || null); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => {
      active = false;
      window.removeEventListener("ee:session-expired", handleSessionExpired);
    };
  }, []);

  const login = async (identifier, password) => {
    const res = await API.post("/auth/login", { identifier, password });
    const { user: authenticatedUser } = res.data;
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = () => {
    API.post("/auth/logout").catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
