import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          User Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The user you're looking for doesn't exist.
        </p>
        <Link href="/admin/users">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Back to Users
          </Button>
        </Link>
      </div>
    </div>
  );
}
