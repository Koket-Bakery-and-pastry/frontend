import { Button } from "@/components/ui/button";
import { Customer } from "../../types/customer";

interface UserProfileHeaderProps {
  user: Customer;
  onDelete: () => void;
}

export default function UserProfileHeader({
  user,
  onDelete,
}: UserProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-6 border-b">
      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-3xl">👤</span>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {user.name}
        </h2>
        <p className="text-lg text-gray-600 mt-1">{user.email}</p>
        <p className="text-sm text-gray-500 mt-2">🗓 Joined {user.joined}</p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Delete User
        </Button>
      </div>
    </div>
  );
}
