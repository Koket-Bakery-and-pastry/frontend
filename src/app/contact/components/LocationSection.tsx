import { MapPin } from "lucide-react"

function LocationSection() {
  return (
    <div className="bg-gray-50 rounded-lg p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <p className="text-foreground font-medium mb-1">123 Bakery Street, Sweet City, SC 12345</p>
      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-600 text-sm"
      >
        Open in Google Maps
      </a>
    </div>
  )
}
export  default LocationSection;