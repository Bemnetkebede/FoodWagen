// "use client"

// import { useState } from "react"
// import { type Food, deleteFood } from "@/services/api"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/dialog"

// interface DeleteModalProps {
//   food: Food | null
//   isOpen: boolean
//   onClose: () => void
//   onSuccess: () => void
// }

// export function DeleteModal({ food, isOpen, onClose, onSuccess }: DeleteModalProps) {
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleDelete = async () => {
//     if (!food) return

//     setIsDeleting(true)
//     setError(null)

//     try {
//       await deleteFood(food.id)
//       onSuccess()
//       onClose()
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to delete food item")
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
//           <AlertDialogDescription>
//             Are you sure you want to delete <strong>{food?.food_name}</strong>? This action cannot be undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         {error && <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}

//         <AlertDialogFooter>
//           <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={handleDelete}
//             disabled={isDeleting}
//             data-test-id="food-delete-confirm"
//             className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//           >
//             {isDeleting ? "Deleting Food..." : "Delete Food"}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }
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
          <DialogTitle>Delete Food Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{food?.food_name}</strong>? This action cannot be undone.
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
            Cancel
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
