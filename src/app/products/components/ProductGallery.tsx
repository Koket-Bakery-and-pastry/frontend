// ...existing code...
"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images?: string[];
  name?: string;
}

const FALLBACK_IMAGES = [
  "/assets/img2.png",
  "/assets/img1.png",
  "/assets/img3.jpeg",
];

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = useMemo(() => {
    if (images && images.length > 0) {
      return images;
    }
    return FALLBACK_IMAGES;
  }, [images]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <img
          src={galleryImages[currentImage] || "/placeholder.svg"}
          alt={name ? `${name} image ${currentImage + 1}` : "Product image"}
          className="w-full h-[250px] md:h-[420px] object-cover"
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
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-15 w-15 md:h-20 md:w-20 overflow-hidden rounded-lg border-2 transition-colors ${
              currentImage === index ? "border-[#C967AC]" : "border-border"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={
                name
                  ? `${name} thumbnail ${index + 1}`
                  : `Thumbnail ${index + 1}`
              }
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
// ...existing code...
