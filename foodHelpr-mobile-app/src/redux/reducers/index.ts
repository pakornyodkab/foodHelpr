import { combineReducers } from "redux";
import randRecipeReducer from "./randRecipeReducer"

const reducers = combineReducers({
    randRecipeReducer: randRecipeReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>