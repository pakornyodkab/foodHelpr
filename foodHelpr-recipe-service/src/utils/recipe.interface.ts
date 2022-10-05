import { Tag } from './constant';
import { Ingredient } from './ingredient.interface';

export interface RecipeId {
  recipeId: string;
}

export interface Recipe {
  recipeId: RecipeId;
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

export interface RecipeList {
  recipeList: Recipe[];
}
