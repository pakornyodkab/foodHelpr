import { Action, SetRestaurantAction } from "../actions";
import { ActionType } from "../action-types";

const initialState = {
  id: "",
  name: "Select Restaurant",
};

function partyReducer(state: any = initialState, action: SetRestaurantAction) {
  switch (action.type) {
    case ActionType.SET_RESTAURANT:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
      };
    default:
      return state;
  }
}

export default partyReducer;
