"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");
    // const accessToken = urlParams.get("accessToken");
    // const refreshToken = urlParams.get("refreshToken");
    const tokens = urlParams.get("token");

    if (userParam && tokens) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        const parsedTokens = JSON.parse(decodeURIComponent(tokens));

        // Determine role
        const role: "admin" | "user" =
          parsedUser.role === "admin" ? "admin" : "user";

        // Store in context (and automatically in localStorage if your context does that)
        login(
          {
            role,
            name: parsedUser.name,
            email: parsedUser.email,
          },
          parsedTokens
        );

        console.log("✅ Google login successful:", parsedUser);

        // Redirect based on role
        router.push(role === "admin" ? "/admin" : "/");
      } catch (error) {
        console.error("❌ Failed to parse user data:", error);
        router.push("/auth/login");
      }
    } else {
      console.error("❌ Missing user or tokens in callback URL");
      router.push("/auth/login");
    }
  }, [login, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Authenticating with Google...</p>
    </div>
  );
}
