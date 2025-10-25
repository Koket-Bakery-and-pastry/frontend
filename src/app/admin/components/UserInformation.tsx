import { Customer } from "../../types/customer";

interface UserInformationProps {
  user: Customer;
}

export default function UserInformation({ user }: UserInformationProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        User Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">User ID</p>
          <p className="text-base text-gray-900">{user.id}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email Address</p>
          <p className="text-base text-gray-900">{user.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Member Since</p>
          <p className="text-base text-gray-900">{user.joined}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Account Status</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
