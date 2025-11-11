"use client"
import SellIcon from '@mui/icons-material/Sell';
import type { Food } from "@/services/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  const restaurantImage = food?.restaurant_image || "/placeholder-restaurant.jpg" // FIXED: Removed restaurant_logo
  const restaurantStatus = food?.restaurant_status || "Closed"

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-103 transition-transform transition-shadow duration-200"
      data-test-id="food-card"
    >
      {/* Image Container with Price Badge */}
      <div className="relative overflow-hidden aspect-square">
        {/* Food Image */}
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/diverse-food-spread.png"
          }}
        />

        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg font-bold text-sm flex items-center gap-1">
          <SellIcon style={{ fontSize: 20, color: '#fff' }} />${displayPrice}
        </div>
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
            <div className=''>
              {/* Food Name */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm truncate" title={foodName}>
                  {foodName.length > 24 ? foodName.slice(0, 23) + "..." : foodName}
                </h3>
              </div>

              <div
                className="text-yellow-500 text-sm font-medium flex-shrink-0 flex items-center gap-1"
                data-test-id="food-rating"
              >
                ⭐ {foodRating.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Three-dot Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-1 w-2 p-0 hover:bg-gray-100 flex-shrink-0">
                <MoreVertIcon className="text-gray-600 text-lg cursor-pointer mt-[-16px]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(food)} data-test-id="food-edit-btn" className='text-orange-600 bg-gray-100 hover:text-black hover:bg-gray-200 border-b border-gray-300'>
              Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(food)} data-test-id="food-delete-btn" className="text-red-600 hover:text-black hover:bg-gray-200">
              Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <span
          className={`inline-block text-xs font-medium px-3 py-1.5 rounded-xl mt-2 ${
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