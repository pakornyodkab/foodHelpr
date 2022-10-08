import axios from "axios";
import { RESTAURANT_URI } from "@env";
import IRestaurantViewModel from "../models/RestaurantViewModel";

const restaurantService = axios.create({
  baseURL: RESTAURANT_URI,
  timeout: 10000,
});

export interface IGetRandomRestaurantRequest {
  latitude: number;
  longitude: number;
  amount: number;
  range: number;
  tags: string[];
  delivery_platforms: string[];
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

export interface GetRestaurantViewModel extends IRestaurantViewModel {}

export default class RestaurantService {
  constructor() {}

  static GetRandomRestaurant = (
    accessToken: string,
    requestParams: IGetRandomRestaurantRequest
  ) => {
    const request = restaurantService.get<IGetRandomRestaurantResponse[]>(
      "get-random-restaurant",
      {
        params: {
          lat: requestParams.latitude,
          lng: requestParams.longitude,
          random_number: requestParams.amount,
          range: requestParams.range,
          delivery_platforms: requestParams.delivery_platforms.join(","),
          tags: requestParams.tags.join(","),
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };

  static GetRestaurantViewModel = (accessToken: string) => {
    const request = restaurantService.get<GetRestaurantViewModel>(
      "get-random-restaurant-view-model",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };
}
