"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ClientProtectedRoute({ children }) {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/auth/login");
    } else if (user.role !== "client") {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "client") {
    return null;
  }

  return children;
}
