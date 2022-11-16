import { Action } from "../actions";
import { ActionType } from "../action-types";

const initialState = {
  tags: [],
  include_ingredients: [],
  exclude_ingredients: [],
  exclude_utensils: [],
  calories_min: 0,
  calories_max: 999999999,
  random_amount: 3,
};

function randRecipeReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case ActionType.SET_RECIPE_FILTER:
      return {
        ...state,
        tags: action.payload.tags,
        include_ingredients: action.payload.include_ingredients,
        exclude_ingredients: action.payload.exclude_ingredients,
        exclude_utensils: action.payload.exclude_utensils,
        calories_min: action.payload.calories_min,
        calories_max: action.payload.calories_max,
        random_amount: action.payload.random_amount,
      };
    default:
      return state;
  }
}

export default randRecipeReducer;
