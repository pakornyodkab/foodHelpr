export default interface IRecipeViewModel {
  tags: {
    name: string;
  }[];
  ingredients: {
    ingredientId: string;
    name: string;
  }[];
  utensils: {
    name: string;
  }[];
  minCal: number;
  maxCal: number;
}
