import { Action } from '../actions';
import { Dispatch } from "redux"
import { ActionType } from '../action-types';

interface payloadDetail{
    selectedTags: Array<string>,
    includedIngredients: Array<string>
    excludedIngredients: Array<string>
    excludedUtensils: Array<string>
    minCal: String
    maxCal: String
    randomAmount: number
}

export const setFilter = (filters: payloadDetail) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_RECIPE_FILTER,
            payload: filters
        })
    }
}
