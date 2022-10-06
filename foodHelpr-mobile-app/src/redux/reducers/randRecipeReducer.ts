import { Action } from '../actions';
import { SET_RECIPE_FILTER } from '../actions/randRecipeActions';

const initialState = {
    selectedTags: [],
    includedIngredients: [],
    excludedIngredients: [],
    excludedUtensils: [],
    minCal: 0,
    maxCal: 999999999,
    randomAmount: 3
}

function randRecipeReducer(state:any = initialState, action:Action) {
    switch (action.type) {
        case SET_RECIPE_FILTER:
            return { ...state, selectedTags: action.payload.selectedTags, includedIngredients: action.payload.includedIngredients, excludedIngredients: action.payload.excludedIngredients, excludedUtensils: action.payload.excludedUtensils, minCal: action.payload.minCal, maxCal: action.payload.maxCal, randomAmount: action.payload.randomAmount };
        default:
            return state;
    }
}

export default randRecipeReducer;