import {
  Order,
  OrderStatus,
  statusColors,
  statusLabels,
} from "../../types/order";
import ProductDetail from "./ProductDetail";

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
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
  const orderId = order._id || order.id || "";

  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-white shadow-sm">
      <div className="flex flex-col xl:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base sm:text-lg truncate">
            Order #{orderId.slice(-8)}{" "}
            <span
              className={`text-xs sm:text-sm px-2 py-1 rounded-md ml-2 ${
                statusColors[order.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {statusLabels[order.status] || order.status}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">{order.date}</p>
          <p className="mt-2 text-sm text-gray-700">
            Customer:{" "}
            <span className="font-medium truncate">
              {order.customer || order.user_details?.name || "Unknown"}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {order.status === "pending" && (
            <>
              <button
                onClick={() => onStatusChange(orderId, "accepted")}
                className="bg-[#4FBC54] hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm w-full sm:w-auto"
              >
                Accept
              </button>
              <button
                onClick={() => onReject(orderId)}
                className="bg-[#FD5B5B] hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm w-full sm:w-auto"
              >
                Reject
              </button>
            </>
          )}

          <select
            value={order.status}
            onChange={(e) =>
              onStatusChange(orderId, e.target.value as OrderStatus)
            }
            className="border rounded-md px-2 py-1 text-xs sm:text-sm w-full sm:w-auto"
          >
            {(Object.keys(statusColors) as OrderStatus[]).map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-4 space-y-2">
        {order.order_items && order.order_items.length > 0 ? (
          order.order_items.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">
                    {item.product_details?.name ||
                      `Product ${item.product_id?.slice(-6) || index + 1}`}
                  </span>
                  <span className="text-gray-500 ml-2">
                    x{item.quantity}
                    {item.kilo ? ` (${item.kilo}kg)` : ""}
                    {item.pieces ? ` (${item.pieces} pieces)` : ""}
                  </span>
                </div>
                {item.product_details?.price && (
                  <span className="font-medium">
                    ${(item.product_details.price * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
              {(item.custom_text || item.additional_description) && (
                <div className="mt-2 text-gray-600 text-xs">
                  {item.custom_text && <p>Message: {item.custom_text}</p>}
                  {item.additional_description && (
                    <p>Note: {item.additional_description}</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : order.products && order.products.length > 0 ? (
          // Fallback for legacy products format
          order.products.map((product) => (
            <ProductDetail
              key={product.id}
              product={product}
              isExpanded={isProductExpanded(orderId, product.id)}
              onToggle={() => onToggleProductDetail(orderId, product.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No items in this order</p>
        )}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
        {/* left: delivery / date / contact */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-start">
            <p className="text-gray-600 text-xs sm:text-sm">
              Delivery Date:{" "}
              <span className="font-medium">
                {order.deliveryDate ||
                  (order.delivery_time
                    ? new Date(order.delivery_time).toLocaleDateString()
                    : "Not specified")}
              </span>
            </p>
            <p className="text-gray-600 text-xs sm:text-sm truncate">
              Contact:{" "}
              <span className="font-medium">
                {order.contact || order.phone_number}
              </span>
            </p>
            {order.rejection_comment && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                Rejection Reason: {order.rejection_comment}
              </p>
            )}
          </div>
        </div>

        {/* right: total and receipt download */}
        <div className="w-full sm:w-auto text-right mt-3 sm:mt-0">
          <p className="font-semibold text-pink-700 text-sm sm:text-base">
            Total: ${order.total_price?.toFixed(2) || "0.00"}
          </p>
          <p className="text-gray-500 text-xs">
            Upfront Paid: ${order.upfront_paid?.toFixed(2) || "0.00"}
          </p>

          <div className="mt-2 flex justify-end">
            {order.receiptUrl || order.payment_proof_url ? (
              <a
                href={`${
                  process.env.NEXT_PUBLIC_API_BASE_URL ||
                  "http://localhost:5001"
                }${order.receiptUrl || order.payment_proof_url}`}
                download={`payment-proof-${orderId.slice(-8)}`}
                className="inline-block bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
              >
                Download Payment Proof
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
