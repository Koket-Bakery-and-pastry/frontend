import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ContactMethodCardProps {
  icon: LucideIcon
  label: string
  iconColor?: string
}
function ContactMethodCard({ icon: Icon, label, iconColor = "text-pink-400" }: ContactMethodCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <Icon className={`w-8 h-8 mb-3 ${iconColor}`} />
      <p className="text-sm font-medium text-foreground">{label}</p>
    </Card>
  )
}


export default ContactMethodCard;