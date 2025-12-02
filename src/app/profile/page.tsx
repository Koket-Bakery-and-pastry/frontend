"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { UserProfileCard } from "./components/UserProfileCard";
import { UserStats } from "./components/UserStats";
import { MyReviewsSection } from "./components/MyReviewsSection";
import { EditProfileModal } from "./components/EditProfileModal";
import { DeleteAccountDialog } from "./components/DeleteAccountDialog";
import { getUserProfile, updateUserProfile, type UserProfile } from "@/app/services/profileService";
import LoadingState from "@/components/LoadingState";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfile();
      setProfile(data);
    } catch (error: any) {
      console.error("Failed to load profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get user initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper to format join date
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSaveProfile = async (data: {
    fullName: string;
    email: string;
    phone: string;
  }) => {
    try {
      const updateData: any = {
        name: data.fullName,
        email: data.email,
      };
      
      // Only include phone_number if it's not empty
      if (data.phone) {
        updateData.phone_number = data.phone;
      }
      
      const response = await updateUserProfile(updateData);
      toast.success(response.message || "Profile updated successfully");
      setEditModalOpen(false);
      await fetchProfile();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setDeleteDialogOpen(false);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background-2 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
          <button
            onClick={fetchProfile}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const user = {
    name: profile.name,
    email: profile.email,
    phone: profile.phone_number || "",
    joinedDate: formatJoinDate(profile.created_at),
    initials: getInitials(profile.name),
  };

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
          onEdit={() => setEditModalOpen(true)}
          onDelete={() => setDeleteDialogOpen(true)}
        />
        
        <UserStats 
          totalOrders={profile.stats.totalOrders} 
          totalSpent={profile.stats.totalSpending} 
        />

        <MyReviewsSection reviews={profile.stats.recentRatings} />

        <EditProfileModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          user={{ fullName: user.name, email: user.email, phone: user.phone }}
          onSave={handleSaveProfile}
        />

        <DeleteAccountDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
