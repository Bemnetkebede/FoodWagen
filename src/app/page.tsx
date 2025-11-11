"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { fetchFoods, searchFoods, type Food } from "@/services/api"
import { Footer } from "@/components/footer"
import FoodCard from "@/components/food-card"
import { DeleteModal } from "@/components/delete-modal"
import { EditModal } from "@/components/edit-modal"
import { AddModal } from "@/components/add-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

const ITEMS_PER_PAGE = 8

export default function Page() {
  const [allFoods, setAllFoods] = useState<Food[]>([])
  const [displayedFoods, setDisplayedFoods] = useState<Food[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  const [deleteFood, setDeleteFood] = useState<Food | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editFood, setEditFood] = useState<Food | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Fetch initial foods
  useEffect(() => {
    loadFoods()
  }, [])

  useEffect(() => {
    setDisplayedFoods(allFoods.slice(0, displayCount))
  }, [allFoods, displayCount])

  const loadFoods = async () => {
    setIsLoading(true)
    setError(null)
    setDisplayCount(ITEMS_PER_PAGE)

    try {
      const data = await fetchFoods()
      setAllFoods(data)
    } catch (err) {
      setError("Failed to load food items. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      loadFoods()
      return
    }

    setIsSearching(true)
    setError(null)
    setDisplayCount(ITEMS_PER_PAGE)

    try {
      const data = await searchFoods(searchQuery)
      setAllFoods(data)
    } catch (err) {
      setError("Search failed. Please try again.")
      console.error(err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    loadFoods()
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
  }

  const handleDelete = (food: Food) => {
    setDeleteFood(food)
    setIsDeleteOpen(true)
  }

  const handleEdit = (food: Food) => {
    setEditFood(food)
    setIsEditOpen(true)
  }

  const handleDeleteSuccess = () => {
    loadFoods()
  }

  const handleEditSuccess = () => {
    loadFoods()
  }

  const handleAddSuccess = () => {
    loadFoods()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <h1 className="text-xl font-bold text-orange-500">FoodWagen</h1>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          data-test-id="food-add-btn"
        >
          + Add Meal
        </Button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-4">Are you starving?</h2>
            <p className="text-lg mb-8 text-gray-100">Within a few clicks, find meals that are accessible near you</p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Delivery/Pickup Tabs */}
              <div className="flex gap-2 bg-white bg-opacity-20 rounded-lg p-2 w-fit">
                <button type="button" className="px-4 py-2 rounded-lg bg-white text-orange-500 font-medium">
                  🚚 Delivery
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition"
                >
                  🛵 Pickup
                </button>
              </div>

              {/* Search Input */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="What do you like to eat today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-test-id="food-search-input"
                  className="flex-1 px-4 py-3 rounded-lg border-0 placeholder-gray-500"
                />
                <Button
                  type="submit"
                  disabled={isSearching}
                  data-test-id="food-search-btn"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  {isSearching ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      Finding...
                    </>
                  ) : (
                    "🔍 Find Meal"
                  )}
                </Button>
              </div>

              {/* Clear Search Button */}
              {searchQuery && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearSearch}
                  data-test-id="food-clear-search-btn"
                  className="text-white border-white hover:bg-white hover:bg-opacity-10 bg-transparent"
                >
                  Clear Search
                </Button>
              )}
            </form>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:flex justify-center">
            {/* Optional: Add hero image here */}
          </div>
        </div>
      </section>

      {/* Featured Meals Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold text-gray-900">Featured Meals</h2>

        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-6 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center">
          <Spinner className="w-8 h-8 mb-4" />
          <p className="text-gray-600">Loading food items...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && allFoods.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No items available</h2>
          <p className="text-gray-600">
            {searchQuery
              ? "No food items match your search. Try a different query."
              : "No food items found. Add one to get started!"}
          </p>
        </div>
      )}

      {/* Food Grid */}
      {!isLoading && displayedFoods.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedFoods.map((food) => (
              <FoodCard key={food.id} food={food} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      )}

      {/* Load More Button */}
      {!isLoading && displayedFoods.length > 0 && displayCount < allFoods.length && (
        <div className="max-w-7xl mx-auto px-6 pb-12 text-center">
          <Button
            onClick={handleLoadMore}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
            data-test-id="food-load-more-btn"
          >
            Load More
          </Button>
        </div>
      )}

      {/* Modals */}
      <DeleteModal
        food={deleteFood}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
      />

      <EditModal
        food={editFood}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={handleEditSuccess}
      />

      <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSuccess={handleAddSuccess} />

      {/* Footer */}
      <Footer />
    </main>
  )
}