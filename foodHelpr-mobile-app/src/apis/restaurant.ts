import axios, { AxiosInstance } from "axios";
import { RESTAURANT_URI } from "@env";
import IRestaurantViewModel from "../models/RestaurantViewModel";

const restaurantService = axios.create({
  //baseURL: "http://10.0.2.2:3000/restaurant/",
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

export interface IGetRestaurantInRangeRequest {
  latitude: number;
  longitude: number;
  range: number;
}

export interface IGetRestaurantInRangeResponse
  extends IGetRandomRestaurantResponse {}

export interface IGetRestaurantViewModel extends IRestaurantViewModel {}

export default class RestaurantService {
  private client: AxiosInstance;
  private accessToken: string;
  constructor(accessToken: string) {
    this.client = axios.create({
      //baseURL: "http://10.0.2.2:3000/",
      baseURL: RESTAURANT_URI,
      timeout: 10000,
    });
    this.accessToken = accessToken;
  }

  GetRandomRestaurant(requestParams: IGetRandomRestaurantRequest) {
    return restaurantService.get<IGetRandomRestaurantResponse[]>(
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
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }

  GetRestaurantViewModel() {
    return restaurantService.get<IGetRestaurantViewModel>(
      "get-random-restaurant-view-model",
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }

  GetRestaurantInRange(requestParams: IGetRestaurantInRangeRequest) {
    return restaurantService.get<IGetRestaurantInRangeResponse[]>(
      "get-restaurant-in-range",
      {
        params: {
          lat: requestParams.latitude,
          lng: requestParams.longitude,
          range: requestParams.range,
        },
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }
}
