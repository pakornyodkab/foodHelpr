export class RandomRecipeRequest {
  constructor(
    public tags: Number[],
    public includeIngredients: string[],
    public excludeIngredients: string[],
    public excludeUtensils: string[],
    public caloriesMin: Number,
    public caloriesMax: Number,
    public recipeNumber: Number,
  ) {}
}
