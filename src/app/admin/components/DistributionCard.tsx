import { FC } from "react";

interface OrderStatus {
  label: string;
  count: number;
  color: string;
}

interface OrderDistributionCardProps {
  statuses: OrderStatus[];
}

// keeps a sensible maximum on large screens but lets the bar shrink with the card
const MAX_BAR_WIDTH = 160; // px, matches tailwind max-w-[160px]

const OrderDistributionCard: FC<OrderDistributionCardProps> = ({
  statuses,
}) => {
  const maxCount = Math.max(...statuses.map((s) => s.count), 1);

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm w-full">
      <h2 className="text-base font-semibold text-gray-800">
        Order Distribution
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Overview of all order statuses
      </p>

      <ul className="space-y-2">
        {statuses.map((status, i) => {
          const widthPercent = (status.count / maxCount) * 100;

          return (
            <li key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-gray-700">{status.label}</span>
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <span className="text-gray-700 font-medium">
                  {status.count}
                </span>

                {/* flexible wrapper: will shrink with the card but won't exceed MAX_BAR_WIDTH */}
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden flex-1 max-w-[160px]">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: status.color,
                    }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderDistributionCard;
