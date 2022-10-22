// import { Action, PartyAction } from "../actions";
// import { ActionType } from "../action-types";

// const initialState = {
//   name: 'Test',
//   restaurant: 'Select Restaurant',
//   apptDate: '',
//   memberList: [],
//   ageRestriction: 0,
//   maxGuests: 0,
//   ownerId: ''
// };

// function createPartyReducer(state: any = initialState, action: PartyAction) {
//   switch (action.type) {
//     case ActionType.SET_CREATE_PARTY_INFO:
//       return {
//         ...state,
//         name: action.payload.name,
//         restaurant: action.payload.restaurant,
//         apptDate: action.payload.apptDate,
//         memberList: action.payload.memberList,
//         ageRestriction: action.payload.ageRestriction,
//         maxGuests: action.payload.maxGuests,
//         ownerId: action.payload.ownerId
//       };
//     default:
//       return state;
//   }
// }

// export default createPartyReducer;
