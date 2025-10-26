import { Order, statusColors } from "../../types/order";
import ProductDetail from "./ProductDetail";

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: Order["status"]) => void;
  onReject: (id: string) => void;
  isProductExpanded: (orderId: string, productId: string) => boolean;
  onToggleProductDetail: (orderId: string, productId: string) => void;
}

export default function OrderCard({
  order,
  onStatusChange,
  onReject,
  isProductExpanded,
  onToggleProductDetail,
}: OrderCardProps) {
  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-white shadow-sm">
      <div className="flex flex-col xl:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base sm:text-lg truncate">
            Order #{order.id}{" "}
            <span
              className={`text-xs sm:text-sm px-2 py-1 rounded-md ml-2 ${
                statusColors[order.status]
              }`}
            >
              {order.status}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">{order.date}</p>
          <p className="mt-2 text-sm text-gray-700">
            Customer:{" "}
            <span className="font-medium truncate">{order.customer}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {order.status === "Pending" && (
            <>
              <button
                onClick={() => onStatusChange(order.id, "Confirmed")}
                className="bg-[#4FBC54] hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm w-full sm:w-auto"
              >
                Accept
              </button>
              <button
                onClick={() => onReject(order.id)}
                className="bg-[#FD5B5B] hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm w-full sm:w-auto"
              >
                Reject
              </button>
            </>
          )}

          <select
            value={order.status}
            onChange={(e) =>
              onStatusChange(order.id, e.target.value as Order["status"])
            }
            className="border rounded-md px-2 py-1 text-xs sm:text-sm w-full sm:w-auto"
          >
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {order.products.map((product) => (
          <ProductDetail
            key={product.id}
            product={product}
            isExpanded={isProductExpanded(order.id, product.id)}
            onToggle={() => onToggleProductDetail(order.id, product.id)}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
        {/* left: delivery / date / contact */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col  items-start ">
            <p className="text-gray-600 text-xs sm:text-sm">
              Delivery:{" "}
              <span className="font-medium">{order.deliveryLocation}</span>
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">
              Date: <span className="font-medium">{order.deliveryDate}</span>
            </p>
            <p className="text-gray-600 text-xs sm:text-sm truncate">
              Contact: <span className="font-medium">{order.contact}</span>
            </p>
          </div>
        </div>

        {/* right: total and receipt download */}
        <div className="w-full sm:w-auto text-right">
          <p className="font-semibold text-pink-700 text-sm sm:text-base">
            Total: $
            {order.products
              .reduce((sum, p) => sum + p.price * p.quantity, 0)
              .toFixed(2)}
          </p>

          <div className="mt-2 flex justify-end">
            {(order as any).receiptUrl ? (
              <a
                href={(order as any).receiptUrl}
                download={`receipt-${order.id}`}
                className="inline-block bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
              >
                Download receipt
              </a>
            ) : (
              <button
                disabled
                className="inline-block bg-gray-200 text-gray-500 px-3 py-1 rounded-md text-xs sm:text-sm cursor-not-allowed"
              >
                No receipt available
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
