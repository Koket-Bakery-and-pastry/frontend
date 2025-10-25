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
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        required
      />
      <Button
        type="submit"
        className="bg-[#C967AC] hover:bg-[#da78d6] text-white px-6 py-2 rounded-md text-sm"
      >
        {buttonText}
      </Button>
      {onCancel && (
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm"
        >
          Cancel
        </Button>
      )}
    </form>
  );
}
