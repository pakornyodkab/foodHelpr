import axios, { AxiosInstance } from "axios";
import IRestaurantViewModel from "../models/RestaurantViewModel";

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
      baseURL: process.env.RESTAURANT_URI,
      timeout: Number(process.env.TIMEOUT),
    });
    this.accessToken = accessToken;
  }

  GetRandomRestaurant(requestParams: IGetRandomRestaurantRequest) {
    return this.client.get<IGetRandomRestaurantResponse[]>(
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
    return this.client.get<IGetRestaurantViewModel>(
      "get-random-restaurant-view-model",
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }

  GetRestaurantInRange(requestParams: IGetRestaurantInRangeRequest) {
    return this.client.get<IGetRestaurantInRangeResponse[]>(
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
