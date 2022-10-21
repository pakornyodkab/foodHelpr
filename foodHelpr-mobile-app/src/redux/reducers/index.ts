import { combineReducers } from "redux";
import partyReducer from "./partyReducer";
// import createPartyReducer from "./createPartyReducer";
import randRecipeReducer from "./randRecipeReducer"

const reducers = combineReducers({
    randRecipeReducer: randRecipeReducer,
    partyReducer: partyReducer
    //createPartyReducer : createPartyReducer

})

export default reducers

export type RootState = ReturnType<typeof reducers>