import axios, { AxiosInstance } from "axios";
import IRecipeViewModel from "../models/RecipeViewModel";
import IRecipe from "../models/Recipe";

export interface IGetRandomRecipeRequest {
  tags: string[];
  include_ingredients: string[];
  exclude_ingredients: string[];
  exclude_utensils: string[];
  calories_min: number;
  calories_max: number;
  random_amount: number;
}
export interface IGetRandomRecipeResponse extends IRecipe {}

export interface IGetRecipeViewModelResponse extends IRecipeViewModel {}

export default class RecipeService {
  private client: AxiosInstance;
  private accessToken: string;
  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: process.env.RECIPE_URI,
      timeout: Number(process.env.TIMEOUT),
    });
    this.accessToken = accessToken;
  }

  GetRandomRecipe(requestParams: IGetRandomRecipeRequest) {
    return this.client.get<IGetRandomRecipeResponse[]>("get-random-recipe", {
      params: {
        tags: requestParams.tags.join(","),
        include_ingredients: requestParams.include_ingredients.join(","),
        exclude_ingredients: requestParams.exclude_ingredients.join(","),
        exclude_utensils: requestParams.exclude_utensils.join(","),
        calories_min: requestParams.calories_min,
        calories_max: requestParams.calories_max,
        random_amount: requestParams.random_amount,
      },
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  GetRecipeViewModel() {
    return this.client.get<IGetRecipeViewModelResponse>(
      "get-recipe-view-model",
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }
}
