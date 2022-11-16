import { Tag } from './constant';
import { DeliveryInfo, Ingredient } from './ingredient.interface';

export interface RecipeId {
  recipeId: string;
}

export interface Recipe {
  recipeId: string;
  name: string;
  tags: Tag[];
  kcal: Number;
  ingredients: [
    {
      ingredientId: string;
      quantity: Number;
      unit: string;
    },
  ];
  method: string[];
  kitchenTools: string[];
  tutorialLinks: string[];
  pictureUrl: string[];
}

export interface RecipeResponse {
  recipeId: string;
  name: string;
  tags: Tag[];
  kcal: Number;
  ingredients: IngredientInfoResponse[];
  method: Method[];
  kitchenTools: string[];
  tutorialLinks: string[];
  pictureUrl: string[];
}

export interface RecipeList {
  recipeList: RecipeResponse[];
}

export interface IngredientInfoResponse {
  ingredientId: string;
  name: string;
  pictureUrl: string[];
  deliveryInfo: DeliveryInfo[];
  quantity: Number;
  unit: string;
}

export interface Method {
  step: Number;
  title: string;
  subStep: string[];
}

export interface RandomRecipesRequest {
  tags: Tag[];
  includeIngredients: string[];
  excludeIngredients: string[];
  excludeUtensils: string[];
  caloriesMin: Number;
  caloriesMax: Number;
  recipeNumber: Number;
}

export interface RecipeViewModel {
  tags: Tag[];
  ingredients: IngredientIdAndName[];
  utensils: string[];
  minKcal: Number;
  maxKcal: Number;
  minRandomNumber: Number;
  maxRandomNumber: Number;
}

export interface IngredientIdAndName {
  ingredientId: string;
  name: string;
}
