"use client";
import { createContext, useState, useEffect, useCallback, useRef } from "react";
import API from "@/lib/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userRef = useRef(user);
  const lastRefreshTimeRef = useRef(Date.now());

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const handleSessionExpired = useCallback(() => {
    setUser(null);
    delete API.defaults.headers.common["Authorization"];

    if (typeof window !== "undefined") {
      const pathname = window.location.pathname || "/";
      const search = window.location.search || "";
      const currentPath = `${pathname}${search}`;
      const isAuthPage = /^\/auth\//.test(pathname);

      const redirectParam = currentPath && !isAuthPage
        ? `?redirect=${encodeURIComponent(currentPath)}&expired=1`
        : "?expired=1";

      window.location.replace(`/auth/login${redirectParam}`);
    }
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const res = await API.post("/auth/refresh");
      const freshUser = res.data?.user || null;
      const freshToken = res.data?.token || null;

      if (freshToken) {
        API.defaults.headers.common["Authorization"] = `Bearer ${freshToken}`;
      }
      if (freshUser) {
        setUser(freshUser);
      }
      lastRefreshTimeRef.current = Date.now();
      return freshUser;
    } catch (err) {
      if (userRef.current && err.response?.status === 401) {
        handleSessionExpired();
      }
      throw err;
    }
  }, [handleSessionExpired]);

  // Initial session bootstrap
  useEffect(() => {
    let active = true;

    const onSessionExpired = () => {
      handleSessionExpired();
    };

    window.addEventListener("ee:session-expired", onSessionExpired);

    API.get("/auth/profile")
      .then((response) => {
        if (active) {
          const profileUser = response.data?.user || null;
          setUser(profileUser);
          lastRefreshTimeRef.current = Date.now();
        }
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
      window.removeEventListener("ee:session-expired", onSessionExpired);
    };
  }, [handleSessionExpired]);

  // Periodic silent refresh (every 15 minutes while user is authenticated)
  useEffect(() => {
    if (!user) return;

    const FIFTEEN_MINUTES = 15 * 60 * 1000;
    const intervalId = setInterval(() => {
      refreshSession().catch(() => {});
    }, FIFTEEN_MINUTES);

    return () => clearInterval(intervalId);
  }, [user, refreshSession]);

  // Tab visibility and focus listener: resume refresh after sleep or tab switch
  useEffect(() => {
    if (!user) return;

    const MIN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

    const handleResume = () => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "visible" &&
        Date.now() - lastRefreshTimeRef.current > MIN_REFRESH_INTERVAL
      ) {
        refreshSession().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleResume);
    window.addEventListener("focus", handleResume);

    return () => {
      document.removeEventListener("visibilitychange", handleResume);
      window.removeEventListener("focus", handleResume);
    };
  }, [user, refreshSession]);

  const login = async (identifier, password) => {
    const res = await API.post("/auth/login", { identifier, password });
    const { user: authenticatedUser, token } = res.data;
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setUser(authenticatedUser);
    lastRefreshTimeRef.current = Date.now();
    return authenticatedUser;
  };

  const logout = () => {
    delete API.defaults.headers.common["Authorization"];
    API.post("/auth/logout").catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}
