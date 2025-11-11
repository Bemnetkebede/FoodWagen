"use client"
import SellIcon from '@mui/icons-material/Sell';
import type { Food } from "@/services/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface FoodCardProps {
  food: Food
  onEdit: (food: Food) => void
  onDelete: (food: Food) => void
}

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  // Safe price handling with fallback
  const price = food?.Price ? Number.parseFloat(food.Price) : 0
  const displayPrice = price > 0 ? price.toFixed(2) : "0.00"

  // Safe fallback values
  const foodName = food?.food_name || "Unknown Food"
  const foodRating = food?.food_rating ?? 0
  const foodImage = food?.food_image || "/placeholder-food.jpg"
  const restaurantName = food?.restaurant_name || "Unknown Restaurant"
  const restaurantImage = food?.restaurant_image || food?.restaurant_logo || "/placeholder-restaurant.jpg"
  const restaurantStatus = food?.restaurant_status || "Closed"

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
      data-test-id="food-card"
    >
      {/* Image Container with Price Badge */}
      <div className="relative overflow-hidden bg-gray-200 aspect-square">
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg font-bold text-sm z-10 flex items-center gap-1">
           <SellIcon style={{ fontSize: 20, color: '#fff' }} />${displayPrice}
        </div>


      {/* Food Image */}
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/diverse-food-spread.png"
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Restaurant Logo and Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Restaurant Image */}
            <img
              src={restaurantImage}
              alt={restaurantName}
              className="flex-shrink-0 w-10 h-10 rounded-lg object-cover bg-gray-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/cozy-italian-restaurant.png"
              }}
            />

            {/* Food Name */}
            <h3 className="font-bold text-gray-900 text-sm truncate" title={foodName}>
              {foodName}
            </h3>
          </div>

          {/* Rating */}
          <span
            className="text-yellow-500 text-sm font-medium flex-shrink-0 flex items-center gap-1"
            data-test-id="food-rating"
          >
            ⭐ {foodRating.toFixed(1)}
          </span>

          {/* Three-dot Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 flex-shrink-0">
                <span className="text-gray-600 font-bold text-lg">•••</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(food)} data-test-id="food-edit-btn">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(food)} data-test-id="food-delete-btn" className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <span
          className={`inline-block text-xs font-medium px-3 py-1.5 rounded-lg ${
            restaurantStatus === "Open Now"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-600 font-semibold"
          }`}
        >
          {restaurantStatus}
        </span>
      </div>
    </article>
  )
}




