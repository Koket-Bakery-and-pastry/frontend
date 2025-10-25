import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 mx-auto shadow-lg">
        <h2
          id="confirm-title"
          className="text-base sm:text-lg font-semibold mb-2"
        >
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-4">{message}</p>
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm px-3 py-2 rounded"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
