"use client"

import { useState } from "react"
import { type Food, deleteFood } from "@/services/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteModalProps {
  food: Food | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function DeleteModal({ food, isOpen, onClose, onSuccess }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!food) return

    setIsDeleting(true)
    setError(null)

    try {
      await deleteFood(food.id)
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete food item")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Delete Meal</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this Meal? Action can not be reversed.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="sm:order-2"
          >
            Yes
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            data-test-id="food-delete-confirm"
            className="bg-red-500 hover:bg-red-600 text-white sm:order-1"
          >
            {isDeleting ? "Deleting..." : "Delete Food"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
