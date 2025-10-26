import { Card } from "@/components/ui/card"

interface UserStatsProps {
  totalOrders: number
  totalSpent: number
}

export function UserStats({ totalOrders, totalSpent }: UserStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <Card className="p-4 bg-pink-50 border-0">
        <p className="text-sm text-gray-600">Total Orders</p>
        <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
      </Card>
      <Card className="p-4 bg-pink-50 border-0">
        <p className="text-sm text-gray-600">Total Spent</p>
        <p className="text-3xl font-bold text-pink-600">${totalSpent.toFixed(2)}</p>
      </Card>
    </div>
  )
}
