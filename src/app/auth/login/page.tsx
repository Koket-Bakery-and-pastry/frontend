"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuthButton, AuthDivider } from "../components";
import { loginUser } from "@/app/services/loginService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      console.log("Login successful:", response);

      // Store tokens (you can choose localStorage, sessionStorage, or cookies)
      // localStorage.setItem("accessToken", response.tokens.accessToken);
      // if (response.tokens.refreshToken) {
      //   localStorage.setItem("refreshToken", response.tokens.refreshToken);
      // }

      // Optionally, store user info
      localStorage.setItem("user", JSON.stringify(response.user));

      // Redirect user based on role
      // if (response.user.role === "admin") {
      //   window.location.href = "/admin/dashboard";
      // } else {
      //   window.location.href = "/dashboard";
      // }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Log in to your Sweet Delights account
            </p>
          </div>

          <GoogleAuthButton />
          <AuthDivider />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            {error && <p className="text-destructive text-sm mt-1">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-6 text-base"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-pink-500 hover:text-pink-600 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
