"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import LoadingState from "@/components/LoadingState";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after loading is complete and user is not logged in
    if (!isLoading && !isLoggedIn) {
      router.replace("/auth/login");
    }
  }, [isLoading, isLoggedIn, router]);

  // Show loading while checking auth state
  if (isLoading) {
    return <LoadingState message="Checking authentication…" fullScreen />;
  }

  // User not logged in - show loading while redirect happens
  if (!isLoggedIn) {
    return <LoadingState message="Redirecting to login…" fullScreen />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background-2 px-4">
        <Card className="flex max-w-md flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Access Restricted
          </h2>
          <p className="text-sm text-muted-foreground">
            You need administrator privileges to view this section. Please
            contact support if you believe this is a mistake.
          </p>
          <Button asChild variant="default">
            <Link href="/">Return to Home</Link>
          </Button>
        </Card>
      </main>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
