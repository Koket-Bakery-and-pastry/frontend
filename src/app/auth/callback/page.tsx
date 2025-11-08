"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const { login } = useAuth();
  const hasRun = useRef(false); // 👈 prevents multiple runs

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true; // ✅ runs only once even in strict mode

    const handleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userParam = urlParams.get("user");
      const tokens = urlParams.get("token");

      if (!userParam || !tokens) {
        console.error("❌ Missing user or tokens in callback URL");
        router.replace("/auth/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        const parsedTokens = JSON.parse(decodeURIComponent(tokens));

        const role: "admin" | "user" =
          parsedUser.role === "admin" ? "admin" : "user";

        // Save in context
        login(
          {
            role,
            name: parsedUser.name,
            email: parsedUser.email,
          },
          parsedTokens
        );

        console.log("✅ Google login successful:", parsedUser);

        // Small delay ensures context is updated before redirect
        setTimeout(() => {
          router.replace(role === "admin" ? "/admin" : "/");
        }, 300);
      } catch (error) {
        console.error("❌ Failed to parse user data:", error);
        router.replace("/auth/login");
      }
    };

    handleAuth();
  }, [login, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Authenticating with Google...</p>
    </div>
  );
}
