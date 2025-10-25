"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Customer } from "../../../types/customer";
import { customersData } from "../../../data/mockCustomers";
import UserDetailLayout from "../../components/UserDetailLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserNotFound from "../../components/UserNotFound";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const userId = parseInt(params.id as string);
    const foundUser = customersData.find((c) => c.id === userId);

    if (foundUser) {
      setUser(foundUser);
    }
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    if (!user) return;
    console.log("Deleting user:", user.id);
    router.push("/admin/users");
  };

  if (loading) {
    return <LoadingSpinner message="Loading user details..." />;
  }

  if (!user) {
    return <UserNotFound />;
  }

  return <UserDetailLayout user={user} onDelete={handleDelete} />;
}
