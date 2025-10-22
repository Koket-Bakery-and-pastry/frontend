"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog"

interface CartItemProps {
  id: string
  image: string
  name: string
  category: string
  price: number
  quantity: number
  onQuantityChange: (quantity: number) => void
  onDelete: () => void
}

export function CartItem({ id, image, name, category, price, quantity, onQuantityChange, onDelete }: CartItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <div className="flex gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
        <img src={image || "/placeholder.svg"} alt={name} className="w-24 h-24 object-cover rounded" />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
          <p className="text-pink-500 font-semibold mt-2">${price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
            −
          </Button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-12 text-center border border-border rounded px-2 py-1"
          />
          <Button variant="outline" size="sm" onClick={() => onQuantityChange(quantity + 1)}>
            +
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
      <DeleteConfirmationDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} onConfirm={onDelete} />
    </>
  )
}
