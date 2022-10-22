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

// interface partyInfoPayload {
//   name: string;
//   restaurant: string;
//   apptDate: string;
//   memberList: Array<string>;
//   ageRestriction: number;
//   maxGuests: number;
//   ownerId: string;
// }

export const setFilter = (filters: payloadDetail) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_RECIPE_FILTER,
      payload: filters,
    });
  };
};

// export const setCreatePartyInfo = (partyInfo: partyInfoPayload) => {
//   return (dispatch: Dispatch<PartyAction>) => {
//     dispatch({
//       type: ActionType.SET_CREATE_PARTY_INFO,
//       payload: partyInfo,
//     });
//   };
// };

export const setRestaurantName = (name: string) => {
  return (dispatch: Dispatch<SetRestaurantAction>) => {
    dispatch({
      type: ActionType.SET_RESTAURANT_NAME,
      payload: { name },
    });
  };
};

