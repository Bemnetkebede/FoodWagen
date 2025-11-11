"use client"

import type React from "react"
import { useState } from "react"
import { type Food, createFood } from "@/services/api"
import { validateFood, type ValidationErrors } from "@/services/validation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

// Create custom type for form data
type FoodFormData = {
  name: string;
  rating: number;
  image: string;
  restaurantName: string;
  logo: string;
  status: string;
  Price: string;
}

const initialFormData: FoodFormData = {
  name: "",
  rating: 3,
  image: "",
  restaurantName: "",
  logo: "",
  status: "",
  Price: "",
}

export function AddModal({ isOpen, onClose, onSuccess }: AddModalProps) {
  const [formData, setFormData] = useState<FoodFormData>(initialFormData)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseFloat(value) : value,
    }))
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value === "Open Now" ? "Open" : "Closed",
    }))
    if (errors.restaurant_status) {
      setErrors((prev) => ({
        ...prev,
        restaurant_status: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Map form data for validation
    const validationData = {
      food_name: formData.name,
      food_rating: formData.rating,
      food_image: formData.image,
      restaurant_name: formData.restaurantName,
      restaurant_logo: formData.logo,
      restaurant_status: formData.status === "Open" ? "Open Now" : "Closed",
      Price: formData.Price
    }

    const validationErrors = validateFood(validationData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Map form data to match Food type for API
      const foodDataForApi = {
        food_name: formData.name,
        food_rating: formData.rating,
        food_image: formData.image,
        restaurant_name: formData.restaurantName,
        restaurant_image: formData.logo,
        restaurant_status: formData.status === "Open" ? "Open Now" : "Closed",
        Price: formData.Price
      }

      await createFood(foodDataForApi)
      onSuccess()
      setFormData(initialFormData)
      setErrors({})
      onClose()
    } catch (err) {
      setErrors({
        food_name: err instanceof Error ? err.message : "Failed to add food",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full bg-white mt-5">
        <DialogHeader>
          <DialogTitle className="text-[#FFB30E] text-center text-xl font-bold">Add a meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div className="space-y-2">
            <Input
              id="add_name"
              name="name"
              placeholder="Food name"
              value={formData.name}
              onChange={handleChange}
              data-test-id="food-add-name"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.food_name && (
              <p id="name-error" className="text-sm text-destructive text-red-400">
                {errors.food_name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div className="space-y-2">
            <Input
              id="add_rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="Food rating"
              value={formData.rating}
              onChange={handleChange}
              data-test-id="food-add-rating"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.food_rating && (
              <p id="rating-error" className="text-sm text-destructive text-red-400">
                {errors.food_rating}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div className="space-y-2">
            <Input
              id="add_image"
              name="image"
              type="url"
              placeholder="Food Image (link)"
              value={formData.image}
              onChange={handleChange}
              data-test-id="food-add-image"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.food_image && (
              <p id="image-error" className="text-sm text-destructive text-red-400">
                {errors.food_image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div className="space-y-2">
            <Input
              id="add_restaurantName"
              name="restaurantName"
              placeholder="Restaurant name"
              value={formData.restaurantName}
              onChange={handleChange}
              data-test-id="food-add-restaurant-name"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.restaurant_name && (
              <p id="restaurantName-error" className="text-sm text-destructive text-red-400">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          {/* Restaurant Logo */}
          <div className="space-y-2">
            <Input
              id="add_logo"
              name="logo"
              type="url"
              placeholder="Restaurant logo (link)"
              value={formData.logo}
              onChange={handleChange}
              data-test-id="food-add-restaurant-logo"
              className="food-input bg-gray-100 text-black border-0"
            />
            {/* FIXED: Changed restaurant_image to restaurant_logo */}
            {errors.restaurant_logo && (
              <p id="logo-error" className="text-sm text-destructive text-red-400">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Input
              id="add_Price"
              name="Price"
              type="text"
              placeholder="Price (e.g., 12.99)"
              value={formData.Price}
              onChange={handleChange}
              data-test-id="food-add-price"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.Price && (
              <p id="Price-error" className="text-sm text-destructive text-red-400">
                {errors.Price}
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div className="space-y-2">
            <Select value={formData.status === "Open" ? "Open Now" : "Closed"} onValueChange={handleSelectChange}>
              <SelectTrigger id="add_status" className="food-input bg-gray-100 text-black border-0">
                <SelectValue placeholder="Restaurant Status (open/close)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            {errors.restaurant_status && (
              <p id="status-error" className="text-sm text-destructive text-red-400">
                {errors.restaurant_status}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-between w-full px-0">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              data-test-id="food-add-submit" 
              className="bg-[#FFB30E] px-22 rounded-lg hover:bg-gray-100 hover:border hover:border-[#FFB30E] hover:text-black"
            >
              {isSubmitting ? "Adding Food..." : "Add"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={isSubmitting} 
              className="px-22 rounded-lg bg-white border border-[#FFB30E] text-black hover:bg-gray-100 hover:border hover:border-[#FFB30E] hover:bg-[#FFB30E]"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}