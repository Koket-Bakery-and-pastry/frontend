import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ContactMethodCardProps {
  icon: LucideIcon;
  label: string;
  text1: string;
  text2: string;
  iconColor?: string;
}
function ContactMethodCard({
  icon: Icon,
  label,
  text1,
  text2,
  iconColor = "text-pink-400",
}: ContactMethodCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow cursor-pointer rounded-xl gap-0">
      <div className="flex items-center justify-center mb-3">
        <span className="rounded-full border-2 border-blue-300 p-4 flex items-center justify-center">
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg font-bold text-black mb-1">{label}</p>
        <p className="text-gray-700">{text1}</p>
        <p className="text-gray-700">{text2}</p>
      </div>
    </Card>
  );
}

export default ContactMethodCard;
