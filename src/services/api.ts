const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io"

export interface Food {
  id: string
  food_name: string
  food_rating: number
  food_image: string
  restaurant_name: string
  restaurant_image: string
  restaurant_status: string
  Price: string
}

export async function fetchFoods(): Promise<Food[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    
    const data = await response.json()
    console.log('Raw API data:', data) // Debug log
    
    // Map the API data to match our Food interface
    const mappedFoods: Food[] = data.map((item: any) => ({
      id: item.id,
      food_name: item.name || item.food_name || 'Unknown Food',
      food_rating: typeof item.rating === 'number' ? item.rating : 
                  typeof item.food_rating === 'number' ? item.food_rating : 0,
      food_image: item.image || item.food_image || item.avatar || '/placeholder-food.jpg',
      restaurant_name: item.restaurantName || item.restaurant_name || 
                      (item.restaurant?.name || 'Unknown Restaurant'),
      restaurant_image: item.logo || item.restaurant_image || 
                       (item.restaurant?.logo || '/placeholder-restaurant.jpg'),
      restaurant_status: item.status === 'Open' || item.open === true ? 'Open Now' : 
                        item.status === 'Closed' || item.open === false ? 'Closed' : 
                        item.restaurant_status || 'Closed',
      Price: item.Price || item.price || '0.00'
    }))
    
    console.log('Mapped foods:', mappedFoods) // Debug log
    return mappedFoods
    
  } catch (error) {
    console.error("Failed to fetch foods:", error)
    throw error
  }
}

export async function searchFoods(query: string): Promise<Food[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/Food?name=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    
    const data = await response.json()
    
    // Map the API data to match our Food interface
    const mappedFoods: Food[] = data.map((item: any) => ({
      id: item.id,
      food_name: item.name || item.food_name || 'Unknown Food',
      food_rating: typeof item.rating === 'number' ? item.rating : 
                  typeof item.food_rating === 'number' ? item.food_rating : 0,
      food_image: item.image || item.food_image || item.avatar || '/placeholder-food.jpg',
      restaurant_name: item.restaurantName || item.restaurant_name || 
                      (item.restaurant?.name || 'Unknown Restaurant'),
      restaurant_image: item.logo || item.restaurant_image || 
                       (item.restaurant?.logo || '/placeholder-restaurant.jpg'),
      restaurant_status: item.status === 'Open' || item.open === true ? 'Open Now' : 
                        item.status === 'Closed' || item.open === false ? 'Closed' : 
                        item.restaurant_status || 'Closed',
      Price: item.Price || item.price || '0.00'
    }))
    
    return mappedFoods
    
  } catch (error) {
    console.error("Search failed:", error)
    throw error
  }
}

export async function createFood(foodData: Omit<Food, "id">): Promise<Food> {
  try {
    // Map our Food interface to the API expected format
    const apiFoodData = {
      name: foodData.food_name,
      rating: foodData.food_rating,
      image: foodData.food_image,
      restaurantName: foodData.restaurant_name,
      logo: foodData.restaurant_image,
      status: foodData.restaurant_status === 'Open Now' ? 'Open' : 'Closed',
      Price: foodData.Price
    }

    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiFoodData),
    })

    if (!response.ok) throw new Error("Failed to create food")
    
    const createdItem = await response.json()
    
    // Map back to our Food interface
    return {
      id: createdItem.id,
      food_name: createdItem.name || foodData.food_name,
      food_rating: createdItem.rating || foodData.food_rating,
      food_image: createdItem.image || foodData.food_image,
      restaurant_name: createdItem.restaurantName || foodData.restaurant_name,
      restaurant_image: createdItem.logo || foodData.restaurant_image,
      restaurant_status: createdItem.status === 'Open' ? 'Open Now' : 
                        createdItem.status === 'Closed' ? 'Closed' : foodData.restaurant_status,
      Price: createdItem.Price || foodData.Price
    }
    
  } catch (error) {
    console.error("Failed to create food:", error)
    throw error
  }
}

export async function updateFood(id: string, foodData: Partial<Food>): Promise<Food> {
  try {
    // Map our Food interface to the API expected format
    const apiFoodData: any = {}
    if (foodData.food_name) apiFoodData.name = foodData.food_name
    if (foodData.food_rating !== undefined) apiFoodData.rating = foodData.food_rating
    if (foodData.food_image) apiFoodData.image = foodData.food_image
    if (foodData.restaurant_name) apiFoodData.restaurantName = foodData.restaurant_name
    if (foodData.restaurant_image) apiFoodData.logo = foodData.restaurant_image
    if (foodData.restaurant_status) {
      apiFoodData.status = foodData.restaurant_status === 'Open Now' ? 'Open' : 'Closed'
    }
    if (foodData.Price) apiFoodData.Price = foodData.Price

    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiFoodData),
    })

    if (!response.ok) throw new Error("Failed to update food")
    
    const updatedItem = await response.json()
    
    // Map back to our Food interface
    return {
      id: updatedItem.id,
      food_name: updatedItem.name || foodData.food_name || '',
      food_rating: updatedItem.rating || foodData.food_rating || 0,
      food_image: updatedItem.image || foodData.food_image || '',
      restaurant_name: updatedItem.restaurantName || foodData.restaurant_name || '',
      restaurant_image: updatedItem.logo || foodData.restaurant_image || '',
      restaurant_status: updatedItem.status === 'Open' ? 'Open Now' : 
                        updatedItem.status === 'Closed' ? 'Closed' : foodData.restaurant_status || 'Closed',
      Price: updatedItem.Price || foodData.Price || '0.00'
    }
    
  } catch (error) {
    console.error("Failed to update food:", error)
    throw error
  }
}

export async function deleteFood(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to delete food")
  } catch (error) {
    console.error("Failed to delete food:", error)
    throw error
  }
}