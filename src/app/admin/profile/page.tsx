"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminProfilePage() {
  const [role, setRole] = useState("Admin");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setPasswordMessage(null);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New password and confirmation do not match.");
      return;
    }
    // Simulate success
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Password updated successfully.");
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <Link href="/admin" className="text-sm text-gray-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Profile Card */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                  👤
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Admin</h2>
                  <p className="text-sm text-gray-600">admin@cakeshop.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Joined October 1, 2025
                  </p>
                </div>
              </div>

              <div className="border rounded p-4">
                <label className="text-sm text-gray-600">Role</label>
                <h1>Admin</h1>
              </div>
            </div>

            {/* Right: Password Change */}
            <div>
              <div className="bg-gradient-to-br from-background-2 to-card p-8 rounded">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <form
                  onSubmit={handlePasswordUpdate}
                  className="space-y-3 max-w-sm"
                >
                  <div>
                    <label className="text-sm text-gray-600">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white text-sm"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white text-sm"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white text-sm"
                      placeholder="Confirm new password"
                    />
                  </div>

                  {passwordMessage && (
                    <div className="text-sm text-center text-gray-700">
                      {passwordMessage}
                    </div>
                  )}

                  <div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded w-full">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
