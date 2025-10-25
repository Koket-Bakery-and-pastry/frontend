interface RecentActivityProps {
  // You can add props for actual activity data later
  activities?: any[];
}

export default function RecentActivity({
  activities = [],
}: RecentActivityProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
        <p>Recent orders and activity will appear here</p>
        <p className="text-sm mt-2">
          This section can be expanded to show order history
        </p>
      </div>
    </div>
  );
}
