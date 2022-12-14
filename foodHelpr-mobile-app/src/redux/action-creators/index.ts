import { Action, SetRestaurantAction } from "../actions";
import { Dispatch } from "redux";
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

interface restaurantPayload {
  id: string;
  name: string;
}

export const setFilter = (filters: payloadDetail) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_RECIPE_FILTER,
      payload: filters,
    });
  };
};

export const setRestaurant = (restaurant: restaurantPayload) => {
  return (dispatch: Dispatch<SetRestaurantAction>) => {
    dispatch({
      type: ActionType.SET_RESTAURANT,
      payload: restaurant,
    });
  };
};
