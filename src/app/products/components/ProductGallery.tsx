"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProductGallery() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = ["/black-forest-cake-full-view.jpg", "/black-forest-cake-slice.jpg", "/black-forest-cake-close-up.jpg"]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt="Black Forest Cake"
          className="h-96 w-full object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
              currentImage === index ? "border-primary" : "border-border"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
