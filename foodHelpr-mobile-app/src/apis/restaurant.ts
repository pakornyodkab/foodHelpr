import axios from "axios";
import { RESTAURANT_URI } from "@env";

const restaurantService = axios.create({
  baseURL: RESTAURANT_URI,
  timeout: 10000,
});

export interface IGetRandomRestaurantRequest {
  latitude: number;
  longitude: number;
  amount: number;
  range: number;
}
export interface IGetRandomRestaurantResponse {
  _id: string;
  name: string;
  address: string;
  restaurantPictureLink: string[];
  recommendedDish: string[];
  tag: [];
  coordinate: {
    _id: string;
    Latitude: number;
    Longitude: number;
  };
  rating: number;
  deliveryInfo: {
    _id: string;
    platform: string;
    link: string;
  }[];
  __v: number;
}

export default class RestaurantService {
  constructor() {}

  static GetRandomRestaurant = (
    accessToken: string,
    requestParams: IGetRandomRestaurantRequest
  ) => {
    const request = restaurantService.get<IGetRandomRestaurantResponse[]>(
      `get-random-restaurant?lat=${requestParams.latitude}&lng=${requestParams.longitude}&random_number=${requestParams.amount}&range=${requestParams.range}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };
}
