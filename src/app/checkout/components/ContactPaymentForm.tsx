"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface ContactPaymentFormProps {
  onSubmit?: (data: FormData) => void
}

interface FormData {
  deliveryDate: string
  recipientPhone: string
  paymentProof: File | null
}

export function ContactPaymentForm({ onSubmit }: ContactPaymentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    deliveryDate: "",
    recipientPhone: "",
    paymentProof: null,
  })

  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, paymentProof: files[0] }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, paymentProof: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="border-2 border-gray-300 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Contact & Payment Information</h2>

      <div className="space-y-6">
        {/* Delivery Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Desired Delivery Date</label>
          <Input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
            placeholder="mm/dd/yyyy"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-2">Custom orders require at least 3 days advance notice</p>
        </div>

        {/* Recipient Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Recipient Phone</label>
          <Input
            type="tel"
            name="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleInputChange}
            placeholder="+251 911334455"
            className="w-full"
          />
        </div>

        {/* Payment Information */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Payment Information</label>
          <p className="text-xs text-muted-foreground mb-3">Upload screen shot or image of the payment proof</p>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-pink-500 bg-pink-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              type="file"
              id="payment-proof"
              onChange={handleFileChange}
              accept="image/png,image/jpeg"
              className="hidden"
            />
            <label htmlFor="payment-proof" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium text-foreground">Click to upload images</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB each</p>
            </label>
            {formData.paymentProof && <p className="text-sm text-green-600 mt-2">✓ {formData.paymentProof.name}</p>}
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-foreground mb-2">Payment Instructions:</p>
          <p className="text-xs text-muted-foreground">
            Transfer to Bank Account: 1234-5678-9012 or use Mobile Payment: +1 (555) 123-4567. Upload your payment
            receipt above.
          </p>
        </div>
      </div>
    </form>
  )
}
