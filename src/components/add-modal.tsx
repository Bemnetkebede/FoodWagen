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

// Use undefined instead of empty string
const initialFormData: Omit<Food, "id"> = {
  food_name: "",
  food_rating: 3,
  food_image: "",
  restaurant_name: "",
  restaurant_logo: "",
  restaurant_status: undefined, // Changed to undefined
}

export function AddModal({ isOpen, onClose, onSuccess }: AddModalProps) {
  const [formData, setFormData] = useState<Omit<Food, "id">>(initialFormData)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "food_rating" ? Number.parseFloat(value) : value,
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

    const validationErrors = validateFood(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await createFood(formData)
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
      <DialogContent className=" w-full bg-white mt-5 ">
        <DialogHeader>
          <DialogTitle className="text-[#FFB30E] text-center text-xl font-bold">Add a meal</DialogTitle>
          {/* <DialogDescription>Fill in the details to add a new food item.</DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div className="space-y-2">
            <Input
              id="add_food_name"
              name="food_name"
              placeholder="Food name"
              value={formData.food_name}
              onChange={handleChange}
              data-test-id="food-add-name"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.food_name && (
              <p id="food_name-error" className="text-sm text-destructive">
                {errors.food_name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div className="space-y-2">
            <Input
              id="Food rating"
              name="food_rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="Food rating"
              value={formData.food_rating}
              onChange={handleChange}
              data-test-id="food-add-rating"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.food_rating && (
              <p id="food_rating-error" className="text-sm text-destructive">
                {errors.food_rating}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div className="space-y-2">
            <Input
              id="add_food_image"
              name="food_image"
              type="url"
              placeholder="Food Image(link)"
              value={formData.food_image}
              onChange={handleChange}
              data-test-id="food-add-image"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.food_image && (
              <p id="food_image-error" className="text-sm text-destructive">
                {errors.food_image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div className="space-y-2">
            <Input
              id="add_restaurant_name"
              name="restaurant_name"
              placeholder="Restaurant name"
              value={formData.restaurant_name}
              onChange={handleChange}
              data-test-id="food-add-restaurant-name"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.restaurant_name && (
              <p id="restaurant_name-error" className="text-sm text-destructive">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          {/* Restaurant Logo */}
          <div className="space-y-2">
            <Input
              id="add_restaurant_logo"
              name="restaurant_logo"
              type="url"
              placeholder="Restaurant logo(link)"
              value={formData.restaurant_logo}
              onChange={handleChange}
              data-test-id="food-add-restaurant-logo"
              className="food-input bg-gray-100 text-black border-0"
            />
            {errors.restaurant_logo && (
              <p id="restaurant_logo-error" className="text-sm text-destructive">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div className="space-y-2">
            <Select value={formData.restaurant_status} onValueChange={handleSelectChange}>
              <SelectTrigger id="add_restaurant_status" className="food-input bg-gray-100 text-black border-0">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {/* Remove the empty value SelectItem */}
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            {errors.restaurant_status && (
              <p id="restaurant_status-error" className="text-sm text-destructive">
                {errors.restaurant_status}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-between w-full px-0">
            <Button type="submit" disabled={isSubmitting} data-test-id="food-add-submit" className="bg-[#FFB30E] px-22 rounded-lg hover:bg-gray-100 hover:border hover:border-[#FFB30E] hover:text-black">
              {isSubmitting ? "Adding Food..." : "Add Food"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="px-22 rounded-lg bg-white border border-[#FFB30E] text-black hover:bg-gray-100 hover:border hover:border-[#FFB30E] hover:bg-[#FFB30E]">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}