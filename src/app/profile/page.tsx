"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { UserProfileCard } from "./components/UserProfileCard";
import { UserStats } from "./components/UserStats";
import { MyReviewsSection } from "./components/MyReviewsSection";
import { EditProfileModal } from "./components/EditProfileModal";
import { DeleteAccountDialog } from "./components/DeleteAccountDialog";

export default function ProfilePage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Alex Texas",
    email: "abdulah-jo+1959@gmail.com",
    phone: "+251900112233",
    joinedDate: "October 1, 2025",
    initials: "AT",
  });

  const reviews = [
    {
      id: "1",
      name: "Your name",
      title: "Title goes here",
      rating: 5,
      content:
        "I ordered a chocolate fudge cake for my birthday and it was beyond amazing! 🎂 The texture was soft, rich, and just the right amount of sweet. Everyone at the party kept asking where I got it from. The design was elegant and exactly like the photo. Definitely ordering again soon!",
      initials: "Y",
    },
    {
      id: "2",
      name: "Alex Texas",
      title: "Absolutely perfect for my Wedding!",
      rating: 5,
      content:
        "I ordered a chocolate fudge cake for my birthday and it was beyond amazing! 🎂 The texture was soft, rich, and just the right amount of sweet. Everyone at the party kept asking where I got it from. The design was elegant and exactly like the photo. Definitely ordering again soon!",
      initials: "AT",
    },
  ];

  const handleSaveProfile = (data: {
    fullName: string;
    email: string;
    phone: string;
  }) => {
    setUser({
      ...user,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
    });
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setDeleteDialogOpen(false);
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
        {/* <UserStats totalOrders={15} totalSpent={2444.0} /> */}
        <EditProfileModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          user={{ fullName: user.name, email: user.email, phone: user.phone }}
          onSave={handleSaveProfile}
        />

        <MyReviewsSection reviews={reviews} />

        {/* <EditProfileModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          user={{ fullName: user.name, email: user.email, phone: user.phone }}
          onSave={handleSaveProfile}
        /> */}

        <DeleteAccountDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
