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

interface RecipeFilterAction {
  type: ActionType.SET_RECIPE_FILTER;
  payload: payloadDetail;
}

// interface CreatePartyAction {
//   type: ActionType.SET_CREATE_PARTY_INFO;
//   payload: partyInfoPayload;
// }

interface SetRestaurantNameAction {
  type: ActionType.SET_RESTAURANT_NAME;
  payload: { name: string };
}

export type Action = RecipeFilterAction ;
// export type PartyAction = CreatePartyAction;
export type SetRestaurantAction = SetRestaurantNameAction ;
