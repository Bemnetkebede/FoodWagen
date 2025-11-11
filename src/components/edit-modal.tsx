"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { type Food, updateFood } from "@/services/api"
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

interface EditModalProps {
  food: Food | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function EditModal({ food, isOpen, onClose, onSuccess }: EditModalProps) {
  const [formData, setFormData] = useState<Partial<Food>>({})
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (food) {
      setFormData(food)
      setErrors({})
    }
  }, [food, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "food_rating" ? Number.parseFloat(value) : value,
    }))
    // Clear error for this field when user starts typing
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
      restaurant_status: value as "Open Now" | "Closed",
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
      food_name: formData.food_name || "",
      food_rating: formData.food_rating || 0,
      food_image: formData.food_image || "",
      restaurant_name: formData.restaurant_name || "",
      restaurant_logo: formData.restaurant_image || "", // Map to restaurant_logo for validation
      restaurant_status: formData.restaurant_status || "",
      Price: formData.Price || ""
    }

    const validationErrors = validateFood(validationData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (!food) return

    setIsSubmitting(true)

    try {
      await updateFood(food.id, formData as Partial<Food>)
      onSuccess()
      onClose()
    } catch (err) {
      setErrors({
        food_name: err instanceof Error ? err.message : "Failed to update food",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full bg-white my-3">
        <DialogHeader>
          <DialogTitle className="text-[#FFB30E] text-center text-xl font-bold my-[-15px]">Edit Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2 mt-0 mt-[-10px]">
          {/* Food Name */}
          <div className="">
            <Label htmlFor="food_name" className="text-gray-500 !important">
              Food Name
            </Label>   
            <Input
              id="food_name"
              name="food_name"
              placeholder="Enter food name"
              value={formData.food_name || ""}
              onChange={handleChange}
              data-test-id="food-edit-name"
              className="food-input bg-gray-100 text-black border-0 mt-1 h-8"
            />
            {errors.food_name && (
              <p id="food_name-error" className="text-sm text-destructive text-red-400">
                {errors.food_name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div className="space-y-2">
            <Label htmlFor="food_rating" className="text-gray-500 !important">Rating (1-5)</Label>
            <Input
              id="food_rating"
              name="food_rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="Enter food rating"
              value={formData.food_rating || ""}
              onChange={handleChange}
              data-test-id="food-edit-rating"
              className="food-input bg-gray-100 text-black border-0 mt-1 h-8"
            />
            {errors.food_rating && (
              <p id="food_rating-error" className="text-sm text-destructive text-red-400">
                {errors.food_rating}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div className="space-y-2">
            <Label htmlFor="food_image" className="text-gray-500 !important">Food Image URL</Label>
            <Input
              id="food_image"
              name="food_image"
              type="url"
              placeholder="Enter food image URL"
              value={formData.food_image || ""}
              onChange={handleChange}
              data-test-id="food-edit-image"
              className="food-input bg-gray-100 text-black border-0 mt-1 h-8"
            />
            {errors.food_image && (
              <p id="food_image-error" className="text-sm text-destructive text-red-400">
                {errors.food_image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div className="space-y-2">
            <Label htmlFor="restaurant_name" className="text-gray-500 !important">Restaurant Name</Label>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              placeholder="Enter restaurant name"
              value={formData.restaurant_name || ""}
              onChange={handleChange}
              data-test-id="food-edit-restaurant-name"
              className="food-input bg-gray-100 text-black border-0 mt-1 h-8"
            />
            {errors.restaurant_name && (
              <p id="restaurant_name-error" className="text-sm text-destructive text-red-400">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          {/* Restaurant Image (FIXED: was restaurant_logo) */}
          <div className="">
            <Label htmlFor="restaurant_image" className="text-gray-500 !important">Restaurant Image URL</Label>
            <Input
              id="restaurant_image"
              name="restaurant_image"
              type="url"
              placeholder="Enter restaurant image URL"
              value={formData.restaurant_image || ""}
              onChange={handleChange}
              data-test-id="food-edit-restaurant-image"
              className="food-input bg-gray-100 text-black border-0 mt-1 h-8"
            />
            {/* Use restaurant_logo for errors since validation expects it */}
            {errors.restaurant_logo && (
              <p id="restaurant_image-error" className="text-sm text-destructive text-red-400">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="Price" className="text-gray-500 !important">Price</Label>
            <Input
              id="Price"
              name="Price"
              type="text"
              placeholder="Enter price"
              value={formData.Price || ""}
              onChange={handleChange}
              data-test-id="food-edit-price"
              className="food-input bg-gray-100 text-black border-0 mt-1 h-8"
            />
            {/* Use type assertion for Price error */}
            {(errors as any).Price && (
              <p id="Price-error" className="text-sm text-destructive text-red-400">
                {(errors as any).Price}
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div className="space-y-2 ">
            <Label htmlFor="restaurant_status" className="mb-3 text-gray-500 !important h-8">Restaurant Status</Label>
            <Select value={formData.restaurant_status || ""} onValueChange={handleSelectChange}>
              <SelectTrigger id="restaurant_status" className="food-input bg-gray-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            {errors.restaurant_status && (
              <p id="restaurant_status-error" className="text-sm text-destructive text-red-400">
                {errors.restaurant_status}
              </p>
            )}
          </div>

          <DialogFooter className="">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              data-test-id="food-edit-submit"
              className="bg-[#FFB30E] px-25 rounded-lg hover:bg-gray-100 hover:border hover:border-[#FFB30E] hover:text-black"
            >
              {isSubmitting ? "Updating Food..." : "Save"}
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