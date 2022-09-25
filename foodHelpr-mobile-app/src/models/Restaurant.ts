import { LatLng } from "react-native-maps";

export default interface IRestaurant {
  id: string;
  restaurantName: string;
  tags: string[];
  imageUrls: string[];
  rating: number;
  recommendedDishes: string[];
  address: string;
  coordinate: LatLng;
  deliveryInfo: {
    _id: string;
    platform: string;
    link: string;
  }[];
}
