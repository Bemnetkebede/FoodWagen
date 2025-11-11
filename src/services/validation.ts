import type { Food } from "./api"

export interface ValidationErrors {
  food_name?: string
  food_rating?: string
  food_image?: string
  restaurant_name?: string
  restaurant_logo?: string  // Keep this for validation errors
  restaurant_status?: string
  Price?: string  // Add Price to ValidationErrors
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validateFood(data: Partial<Food>): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.food_name?.trim()) {
    errors.food_name = "Food Name is required"
  }

  if (!data.food_rating || isNaN(data.food_rating)) {
    errors.food_rating = "Food Rating must be a number"
  } else if (data.food_rating < 1 || data.food_rating > 5) {
    errors.food_rating = "Food Rating must be between 1 and 5"
  }

  if (!data.food_image?.trim()) {
    errors.food_image = "Food Image URL is required"
  } else if (!isValidUrl(data.food_image)) {
    errors.food_image = "Food Image URL must be a valid URL"
  }

  if (!data.restaurant_name?.trim()) {
    errors.restaurant_name = "Restaurant Name is required"
  }

  // FIXED: Use restaurant_image instead of restaurant_logo
  if (!data.restaurant_image?.trim()) {
    errors.restaurant_logo = "Restaurant Image URL is required"  // Keep error key as restaurant_logo
  } else if (!isValidUrl(data.restaurant_image)) {
    errors.restaurant_logo = "Restaurant Image URL must be a valid URL"  // Keep error key as restaurant_logo
  }

  if (!data.restaurant_status) {
    errors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
  } else if (!["Open Now", "Closed"].includes(data.restaurant_status)) {
    errors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
  }

  // Add Price validation
  if (!data.Price?.trim()) {
    errors.Price = "Price is required"
  } else if (isNaN(Number.parseFloat(data.Price))) {
    errors.Price = "Price must be a valid number"
  }

  return errors
}