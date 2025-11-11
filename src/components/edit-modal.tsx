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

    const validationErrors = validateFood(formData)
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
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Edit Food Item</DialogTitle>
          <DialogDescription>Update the details of the food item below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div className="space-y-2">
            <Label htmlFor="food_name">Food Name</Label>
            <Input
              id="food_name"
              name="food_name"
              placeholder="Enter food name"
              value={formData.food_name || ""}
              onChange={handleChange}
              data-test-id="food-edit-name"
              className="food-input"
            />
            {errors.food_name && (
              <p id="food_name-error" className="text-sm text-destructive">
                {errors.food_name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div className="space-y-2">
            <Label htmlFor="food_rating">Rating (1-5)</Label>
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
              className="food-input"
            />
            {errors.food_rating && (
              <p id="food_rating-error" className="text-sm text-destructive">
                {errors.food_rating}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div className="space-y-2">
            <Label htmlFor="food_image">Food Image URL</Label>
            <Input
              id="food_image"
              name="food_image"
              type="url"
              placeholder="Enter food image URL"
              value={formData.food_image || ""}
              onChange={handleChange}
              data-test-id="food-edit-image"
              className="food-input"
            />
            {errors.food_image && (
              <p id="food_image-error" className="text-sm text-destructive">
                {errors.food_image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div className="space-y-2">
            <Label htmlFor="restaurant_name">Restaurant Name</Label>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              placeholder="Enter restaurant name"
              value={formData.restaurant_name || ""}
              onChange={handleChange}
              data-test-id="food-edit-restaurant-name"
              className="food-input"
            />
            {errors.restaurant_name && (
              <p id="restaurant_name-error" className="text-sm text-destructive">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          {/* Restaurant Logo */}
          <div className="space-y-2">
            <Label htmlFor="restaurant_logo">Restaurant Logo URL</Label>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              type="url"
              placeholder="Enter restaurant logo URL"
              value={formData.restaurant_logo || ""}
              onChange={handleChange}
              data-test-id="food-edit-restaurant-logo"
              className="food-input"
            />
            {errors.restaurant_logo && (
              <p id="restaurant_logo-error" className="text-sm text-destructive">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div className="space-y-2">
            <Label htmlFor="restaurant_status">Restaurant Status</Label>
            <Select value={formData.restaurant_status || ""} onValueChange={handleSelectChange}>
              <SelectTrigger id="restaurant_status" className="food-input">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} data-test-id="food-edit-submit">
              {isSubmitting ? "Updating Food..." : "Update Food"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
