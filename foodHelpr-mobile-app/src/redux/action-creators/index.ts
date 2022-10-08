import { Action } from "../actions";
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

export const setFilter = (filters: payloadDetail) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_RECIPE_FILTER,
      payload: filters,
    });
  };
};
