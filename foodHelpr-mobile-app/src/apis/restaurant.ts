import axios from "axios";
import { RESTAURANT_URI } from "@env";
import IRestaurantViewModel from "../models/RestaurantViewModel";

const restaurantService = axios.create({
  //baseURL: "http://10.0.2.2:3000/restaurant/",
  baseURL: "http://192.168.43.128:3000/restaurant/",
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

export interface IGetRestaurantInRangeRequest {
  latitude: number;
  longitude: number;
  range: number;
}

export interface IGetRestaurantInRangeResponse
  extends IGetRandomRestaurantResponse {}

export interface IGetRestaurantViewModel extends IRestaurantViewModel {}

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
    const request = restaurantService.get<IGetRestaurantViewModel>(
      "get-random-restaurant-view-model",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };

  static GetRestaurantInRange = (
    accessToken: string,
    requestParams: IGetRestaurantInRangeRequest
  ) => {
    const request = restaurantService.get<IGetRestaurantInRangeResponse[]>(
      "get-restaurant-in-range",
      {
        params: {
          lat: requestParams.latitude,
          lng: requestParams.longitude,
          range: requestParams.range,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };
}
