"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, Calendar, Edit, Trash2 } from "lucide-react"

interface UserProfileCardProps {
  user: {
    name: string
    email: string
    phone: string
    joinedDate: string
    initials: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function UserProfileCard({ user, onEdit, onDelete }: UserProfileCardProps) {
  return (
    <Card className="p-6 border-2">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16 bg-pink-100">
            <AvatarFallback className="bg-pink-100 text-pink-600 text-lg font-semibold">{user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <Badge className="bg-pink-600">User</Badge>
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {user.joinedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex items-center gap-2 bg-transparent">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}
