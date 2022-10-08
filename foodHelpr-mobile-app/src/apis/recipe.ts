import axios from "axios";
import { RESTAURANT_URI } from "@env";

const recipeService = axios.create({
  baseURL: RESTAURANT_URI,
  timeout: 10000,
});

export interface IGetRandomRecipeRequest {
  latitude: number;
  longitude: number;
  amount: number;
  range: number;
}
export interface IGetRandomRecipeResponse {
  _id: string;
  name: string;
  address: string;
  recipePictureLink: string[];
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

export default class RecipeService {
  constructor() {}

  static GetRandomRecipe = (
    accessToken: string,
    requestParams: IGetRandomRecipeRequest
  ) => {
    const request = recipeService.get<IGetRandomRecipeResponse[]>(
      `get-random-recipe?lat=${requestParams.latitude}&lng=${requestParams.longitude}&random_number=${requestParams.amount}&range=${requestParams.range}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };
}
