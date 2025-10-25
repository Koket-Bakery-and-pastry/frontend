interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rejectReason: string;
  onRejectReasonChange: (reason: string) => void;
}

export default function RejectModal({
  isOpen,
  onClose,
  onConfirm,
  rejectReason,
  onRejectReasonChange,
}: RejectModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-white rounded-lg p-4 sm:p-6 w-11/12 sm:w-96 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Reject Order
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Are you sure you want to reject this order? You can optionally add a
          reason below.
        </p>
        <textarea
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="Enter rejection reason..."
          value={rejectReason}
          onChange={(e) => onRejectReasonChange(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md w-full sm:w-auto"
          >
            Reject Order
          </button>
        </div>
      </div>
    </div>
  );
}
