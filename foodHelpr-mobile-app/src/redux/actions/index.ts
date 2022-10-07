import { ActionType } from "../action-types";

interface payloadDetail{
    selectedTags: Array<string>,
    includedIngredients: Array<string>
    excludedIngredients: Array<string>
    excludedUtensils: Array<string>
    minCal: String
    maxCal: String
    randomAmount: number
}

interface RecipeFilterAction {
    type: ActionType.SET_RECIPE_FILTER,
    payload: payloadDetail,
}

export type Action = RecipeFilterAction