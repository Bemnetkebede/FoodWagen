import { useState, useEffect } from 'react';
import { Food, fetchFoods, searchFoods, createFood, updateFood, deleteFood } from '@/services/api';

// Use the API's Food type and define FoodFormData based on it
type FoodFormData = Omit<Food, "id">;

export const useFoods = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFoodsData = async (search?: string) => {
    setLoading(true);
    try {
      const data = search ? await searchFoods(search) : await fetchFoods();
      setFoods(data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (foodData: FoodFormData) => {
    try {
      const newFood = await createFood(foodData);
      setFoods(prev => [newFood, ...prev]);
      return true;
    } catch (error) {
      console.error('Error adding food:', error);
      return false;
    }
  };

  const updateFoodItem = async (id: string, foodData: Partial<Food>) => {
    try {
      const updatedFood = await updateFood(id, foodData);
      setFoods(prev => prev.map(food => food.id === id ? updatedFood : food));
      return true;
    } catch (error) {
      console.error('Error updating food:', error);
      return false;
    }
  };

  const deleteFoodItem = async (id: string) => {
    try {
      await deleteFood(id);
      setFoods(prev => prev.filter(food => food.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting food:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchFoodsData(searchTerm);
  }, [searchTerm]);

  return {
    foods,
    loading,
    searchTerm,
    setSearchTerm,
    addFood,
    updateFood: updateFoodItem,
    deleteFood: deleteFoodItem,
    refetch: () => fetchFoodsData(searchTerm),
  };
};