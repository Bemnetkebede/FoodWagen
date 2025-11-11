"use client"
import type React from "react"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { useState, useEffect } from "react"
import { fetchFoods, searchFoods, type Food } from "@/services/api"
import { Footer } from "@/components/footer"
import FoodCard from "@/components/food-card"
import { DeleteModal } from "@/components/delete-modal"
import { EditModal } from "@/components/edit-modal"
import { AddModal } from "@/components/add-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import Image1 from '../../public/Images/img1.png';
import Image2 from '../../public/Images/img2.png'

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
    <main className="min-h-screen bg-white ">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4  sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between mx-25">
          <div className="flex gap-2">
              <Image
                src={Image2}
                alt="Delicious food"
                width={22}
                height={22}
                className="object-contain max-w-full h-auto"
              />
            {/* <span className="text-2xl">🍽️</span> */}
            <h1 className="font-bold text-[25px] py-2">
              <span className="text-[#F17228]">Food</span>
              <span className="text-[#FFB30E]">Wagen</span>
            </h1>
          </div>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-orange-500 hover:bg-orange-500 text-white px-6 h-8 rounded-lggap-1"
            data-test-id="food-add-btn"
          >
            Add Meal
          </Button>
        </div>
      </header>



      <section className="relative bg-gradient-to-r from-[#FFB30e] to-yellow-500 px-3 py-13">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Hero Content */}
    <div className="text-white ml-29 mt-12">
      <h2 className="text-5xl font-bold mb-3">Are you starving?</h2>
      <p className="mb-6 text-gray-100">Within a few clicks, find meals that are accessible near you</p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white rounded-xl pb-6 w-150 mb-5">
        {/* Delivery/Pickup Tabs */}
        <div className="flex gap-2 bg-white bg-opacity-20 p-3 w-fit mx-2 pt-4">
          <button className="flex items-center text-[#F17228] font-bold bg-[#FEF1E9] px-4 rounded-md mb-[-5] gap-2 text-sm h-8">
            <TwoWheelerIcon className="" />
            <span className="">Delivery</span>
          </button>
          <button className="flex items-center space-x-2 text-sm h-8">
            <ShoppingBagIcon className="text-gray-500 w-10 h-10" />
            <span className="font-semibold text-gray-500">Pick up</span>
          </button>
        </div>
        <div className="border-t border-black w-full opacity-6 mt-0 mb-0">-</div>

        {/* Search Input */}
        <div className="flex mx-4 gap-2 my-[-7px]">
          <div className="flex items-center bg-[#F5F5F5] rounded-lg h-11 px-2">
            <SearchIcon className="text-orange-300" />
            <input
              type="text"
              placeholder="What do you like to eat today?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-test-id="food-search-input"
              className="ml-2 flex-1 bg-[#F5F5F5] placeholder-gray-400 outline-none text-sm w-87 text-black"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSearching}
            data-test-id="food-search-btn"
            className="text-white px-6 py-2 rounded-lg font-medium h-10 w-40 bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-90 transition"
          >
            {isSearching ? (
              <>
                <Spinner className="w-4 h-4 mr-2" />
                Finding...
              </>
            ) : (
              <span className="flex items-center">
                <SearchIcon className="text-orange-300 mr-2 w-4 h-4" />
                Find Meal
              </span>
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
            className="text-white border-white hover:bg-white hover:bg-opacity-10 bg-transparent "
          >
            Clear Search
          </Button>
        )}
      </form>
    </div>

    {/* Hero Image - MOVED INSIDE THE GRID */}
    <div className="absolute bottom-0 right-0 lg:right-10 xl:right-40">
      <Image
        src={Image1}
        alt="Delicious food"
        width={300}
        height={300}
        className="object-contain max-w-full h-auto"
      />
    </div>
  </div>
</section>


      {/* Featured Meals Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex  justify-center">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Featured Meals</h2>
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
        <section className="max-w-7xl mx-10 px-6 pb-12">
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