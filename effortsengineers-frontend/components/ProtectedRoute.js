"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // If no user is logged in, redirect to login
    if (!user) {
      router.push("/auth/login");
    }
    // If a role is required and user doesn't match, redirect to home
    else if (role && user.role !== role) {
      router.push("/");
    }
  }, [user, isLoading, router, role]);

  // Render children only if user is authenticated and role matches
  if (isLoading || !user || (role && user.role !== role)) {
    return null; // Prevents flicker before redirect
  }

  return children;
}
