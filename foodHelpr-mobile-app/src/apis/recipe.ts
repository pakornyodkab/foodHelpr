import axios from "axios";
import { RECIPE_URI } from "@env";
import IIngredient from "../models/Ingredient";
import IRecipeViewModel from "../models/RecipeViewModel";
import IRecipe from "../models/Recipe";

const recipeService = axios.create({
  baseURL: RECIPE_URI,
  timeout: 10000,
});

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
  constructor() {}

  static GetRandomRecipe = (
    accessToken: string,
    requestParams: IGetRandomRecipeRequest
  ) => {
    const request = recipeService.get<IGetRandomRecipeResponse[]>(
      "get-random-recipe",
      {
        params: {
          tags: requestParams.tags.join(","),
          include_ingredients: requestParams.include_ingredients.join(","),
          exclude_ingredients: requestParams.exclude_ingredients.join(","),
          exclude_utensils: requestParams.exclude_utensils.join(","),
          calories_min: requestParams.calories_min,
          calories_max: requestParams.calories_max,
          random_amount: requestParams.random_amount,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };

  static GetRecipeViewModel = (accessToken: string) => {
    const request = recipeService.get<IGetRecipeViewModelResponse>(
      "get-recipe-view-model",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };
}
