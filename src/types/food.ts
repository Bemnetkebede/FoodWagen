// export interface Food {
//   id: string;
//   name: string;
//   price: number;
//   rating: number;
//   image: string;
//   restaurantName: string;
//   restaurantLogo: string;
//   restaurantStatus: "Open Now" | "Closed";
//   createdAt?: string;
// }

// types/food.ts
export interface Food {
  id: string
  food_name: string
  food_rating: number
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: "Open Now" | "Closed"
  Price?: string
  restaurant_image?: string
}
export interface FoodFormData {
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurantName: string;
  restaurantLogo: string;
  restaurantStatus: "Open Now" | "Closed";
}
