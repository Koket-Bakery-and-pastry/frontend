import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CategoryFormProps {
  onSubmit: (name: string) => void;
  placeholder?: string;
  buttonText?: string;
  initialValue?: string;
  onCancel?: () => void;
}

export default function CategoryForm({
  onSubmit,
  placeholder = "Enter category name",
  buttonText = "Add Category",
  initialValue = "",
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border border-gray-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        required
      />
      <div className="flex gap-2 sm:gap-3">
        <Button
          type="submit"
          className="bg-[#C967AC] hover:bg-[#da78d6] text-white px-4 sm:px-6 py-2 rounded-md text-sm flex-1 sm:flex-none min-w-[120px]"
        >
          {buttonText}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-md text-sm flex-1 sm:flex-none min-w-[100px]"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
