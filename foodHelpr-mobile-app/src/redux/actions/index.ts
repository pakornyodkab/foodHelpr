import { ActionType } from "../action-types";

interface payloadDetail {
  tags: Array<string>;
  include_ingredients: Array<string>;
  exclude_ingredients: Array<string>;
  exclude_utensils: Array<string>;
  calories_min: number;
  calories_max: number;
  random_amount: number;
}

interface RecipeFilterAction {
  type: ActionType.SET_RECIPE_FILTER;
  payload: payloadDetail;
}

export type Action = RecipeFilterAction;
