import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ReviewItemProfileProps {
  name: string;
  title: string;
  rating: number;
  content: string;
  initials: string;
}

export function ReviewItemProfile({
  name,
  title,
  rating,
  content,
  initials,
}: ReviewItemProfileProps) {
  return (
    <div className="border-b pb-4 last:border-b-0">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 bg-primary/10">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "fill-orange-400 text-orange-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
}
