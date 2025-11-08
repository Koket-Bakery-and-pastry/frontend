"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (userParam && accessToken && refreshToken) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(parsedUser));
        localStorage.setItem(
          "tokens",
          JSON.stringify({ accessToken, refreshToken })
        );

        console.log("✅ User logged in:", parsedUser);

        router.push("/"); // redirect to homepage or dashboard
      } catch (error) {
        console.error("❌ Failed to parse user data:", error);
        router.push("/auth/login");
      }
    } else {
      console.error("❌ Missing user or tokens in callback URL");
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Authenticating with Google...</p>
    </div>
  );
}
