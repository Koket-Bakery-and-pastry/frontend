import { FC } from "react";
import { TrendingUp } from "lucide-react";

interface TopSellingProductsCardProps {
  products?: { name: string; revenue: number }[];
}

const TopSellingProductsCard: FC<TopSellingProductsCardProps> = ({
  products,
}) => {
  const hasData = products && products.length > 0;

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm w-full">
      <div className="flex items-center gap-2 mb-1 ">
        <TrendingUp className="w-5 h-5 text-gray-800" />
        <h2 className="text-base font-semibold text-gray-800">
          Top Selling Products
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">Best performers by revenue</p>

      {!hasData ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No sales data yet
        </p>
      ) : (
        <ul className="space-y-2 overflow-y-scroll max-h-32">
          {products!.map((product, i) => (
            <li key={i} className="flex justify-between text-smp-2">
              <span className="text-gray-700">{product.name}</span>
              <span className="font-medium text-gray-800">
                ${product.revenue}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopSellingProductsCard;
