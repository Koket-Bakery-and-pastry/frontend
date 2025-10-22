"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CartItem } from "./components/CartItem"
import { OrderSummary } from "./components/OrderSummary"

interface CartItemData {
  id: string
  image: string
  name: string
  category: string
  price: number
  quantity: number
}

export default function ShoppingCartPage() {
  const [items, setItems] = useState<CartItemData[]>([
    {
      id: "1",
      image: "/black-forest-cake.png",
      name: "Black Forest Cake",
      category: "Cakes",
      price: 48,
      quantity: 1,
    },
    {
      id: "2",
      image: "/black-forest-cake.png",
      name: "Black Forest Cake",
      category: "Cakes",
      price: 48,
      quantity: 1,
    },
    {
      id: "3",
      image: "/black-forest-cake.png",
      name: "Black Forest Cake",
      category: "Cakes",
      price: 48,
      quantity: 1,
    },
  ])

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-12 text-foreground">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
                <Button
                  variant="outline"
                  className="mt-6 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                >
                  Continue Shopping
                </Button>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Your cart is empty</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary subtotal={subtotal} total={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
