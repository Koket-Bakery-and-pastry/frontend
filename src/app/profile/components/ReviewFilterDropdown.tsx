"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface ReviewFilterDropdownProps {
  onFilterChange: (rating: number | null) => void
}

export function ReviewFilterDropdown({ onFilterChange }: ReviewFilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-orange-100 border-orange-300 text-orange-600 hover:bg-orange-100">
          All Ratings
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onFilterChange(null)}>All Ratings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange(5)}>5 - Stars</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange(4)}>4 - Stars</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange(3)}>3 - Stars</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange(2)}>2 - Stars</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange(1)}>1 - Star</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
