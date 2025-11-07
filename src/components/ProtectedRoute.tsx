"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      router.push("/auth/login");
    } else if (requireAdmin && user?.role !== "admin") {
      // Redirect non-admin users away from admin routes
      router.push("/");
    }
  }, [isLoggedIn, requireAdmin, router, user]);

  // Optional: You can add a small loading UI while checking
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // If admin is required but the user is not admin, don't render content
  if (requireAdmin && user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-destructive font-medium">
          Access denied. Admins only.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
