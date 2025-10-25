import { Customer } from "../../types/customer";

interface StatsCardsProps {
  user: Customer;
}

export default function StatsCards({ user }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {user.totalOrders}
            </p>
          </div>
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-xl">📦</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600">Total Spent</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${user.totalSpent.toFixed(2)}
            </p>
          </div>
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-xl">💰</span>
          </div>
        </div>
      </div>
    </div>
  );
}
