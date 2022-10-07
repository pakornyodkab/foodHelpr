import IIngredient from "./Ingredient";

export default interface IRecipe {
  name: string;
  recipe_id: string;
  kcal: number;
  tags: string[];
  tutorial_links: {
    platform: string;
    url: string;
  }[];
  ingredients: IIngredient[];
  kitchen_tools: string[];
  method: string;
  picture_url: string[];
}
