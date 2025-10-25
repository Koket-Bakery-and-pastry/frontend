import React, { FC, JSX } from "react";
import { DollarSign, ClipboardList, Gift, Package } from "lucide-react";

type IconType = "revenue" | "orders" | "requests" | "products";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  iconType: IconType;
}

const icons: Record<IconType, JSX.Element> = {
  revenue: <DollarSign className="text-green-500 w-6 h-6" />,
  orders: <ClipboardList className="text-yellow-500 w-6 h-6" />,
  requests: <Gift className="text-yellow-500 w-6 h-6" />,
  products: <Package className="text-purple-500 w-6 h-6" />,
};

const StatCard: FC<StatCardProps> = ({ title, value, subtext, iconType }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full h-24 sm:h-28 md:h-32">
      <div className="flex-1">
        <p className="text-xs sm:text-sm md:text-base text-gray-500">{title}</p>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          {value}
        </h3>
        {subtext && (
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1">
            {subtext}
          </p>
        )}
      </div>
      <div className="ml-4 flex-shrink-0 transform scale-100 sm:scale-110 md:scale-125">
        {icons[iconType]}
      </div>
    </div>
  );
};

export default StatCard;
