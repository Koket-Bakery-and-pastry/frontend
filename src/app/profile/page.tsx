"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { UserProfileCard } from "./components/UserProfileCard";
import { UserStats } from "./components/UserStats";
import { MyReviewsSection } from "./components/MyReviewsSection";
import { EditProfileModal } from "./components/EditProfileModal";
import { DeleteAccountDialog } from "./components/DeleteAccountDialog";
import {
  getProfile,
  User,
  UserStatsData,
  UserRating,
} from "../services/userService";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading, logout } = useAuth();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    joinedDate: "",
    initials: "",
    profileImage: "",
  });
  const [stats, setStats] = useState<UserStatsData>({
    totalOrders: 0,
    totalSpending: 0,
    recentRatings: [],
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await getProfile();

      setUser({
        name: profileData.name || "Unknown",
        email: profileData.email || "",
        phone: profileData.phone || "",
        joinedDate: profileData.created_at
          ? new Date(profileData.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Unknown",
        initials: getInitials(profileData.name || "U"),
        profileImage: profileData.profile_image || "",
      });

      // Set stats from API
      if (profileData.stats) {
        setStats({
          totalOrders: profileData.stats.totalOrders || 0,
          totalSpending: profileData.stats.totalSpending || 0,
          recentRatings: profileData.stats.recentRatings || [],
        });
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !isLoggedIn) {
      router.replace("/auth/login");
      return;
    }

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [authLoading, isLoggedIn, router, fetchProfile]);

  // Transform API reviews to component format
  const reviews = stats.recentRatings.map((rating: UserRating) => ({
    product: {
      _id: rating.product._id,
      name: rating.product.name,
    },
    rating: rating.rating,
    comment: rating.comment,
    created_at: rating.created_at,
  }));

  const handleSaveProfile = async (data: {
    fullName: string;
    email: string;
    phone: string;
  }) => {
    setUser({
      ...user,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      initials: getInitials(data.fullName),
    });
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setDeleteDialogOpen(false);
    logout();
    router.push("/");
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background-2 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show loading while fetching profile
  if (loading) {
    return (
      <div className="min-h-screen bg-background-2 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background-2 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-2 p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <UserProfileCard
          user={user}
          stats={stats}
          onEdit={() => setEditModalOpen(true)}
          onDelete={() => setDeleteDialogOpen(true)}
        />
        <EditProfileModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          user={{ fullName: user.name, email: user.email, phone: user.phone }}
          onSave={handleSaveProfile}
        />

        <MyReviewsSection reviews={reviews} />

        <DeleteAccountDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
