import { IsNotEmpty } from 'class-validator';
import { RecipeId } from '../utils/recipe.interface';
import { Tag } from '../utils/constant';
import { Ingredient } from '../utils/ingredient.interface';

export class CreateRecipeDto {
  @IsNotEmpty()
  recipeId: RecipeId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tags: Array<Tag>;

  @IsNotEmpty()
  kcal: Number;

  @IsNotEmpty()
  ingredients: Array<Ingredient>;

  @IsNotEmpty()
  method: Array<string>;

  @IsNotEmpty()
  kitchenTools: Array<string>;

  @IsNotEmpty()
  tutorialLinks: Array<string>;

  @IsNotEmpty()
  pictureUrl: Array<string>;
}
