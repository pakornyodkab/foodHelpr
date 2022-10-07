import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RecipeService } from './recipe.service';
import {
  RandomRecipesRequest,
  Recipe,
  RecipeId,
  RecipeList,
  RecipeResponse,
} from '../utils/recipe.interface';

@Controller()
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @GrpcMethod('RecipeService', 'Create')
  createRecipe(recipe: Recipe): Promise<RecipeResponse> {
    return this.recipeService.createRecipe(recipe);
  }

  @GrpcMethod('RecipeService', 'GetAll')
  async getRecipes(): Promise<RecipeList> {
    const recipeList = await this.recipeService.getRecipes();
    return { recipeList };
  }

  @GrpcMethod('RecipeService', 'GetById')
  async getRecipeById(recipeId: RecipeId): Promise<RecipeResponse> {
    const result = await this.recipeService.getRecipeById(recipeId);
    return result;
  }

  @GrpcMethod('RecipeService', 'UpdateById')
  updateRecipeById(recipe: Recipe): Promise<RecipeResponse> {
    return this.recipeService.updateRecipeById(recipe);
  }

  @GrpcMethod('RecipeService', 'DeleteById')
  deleteRecipeById(recipeId: RecipeId) {
    return this.recipeService.deleteRecipeById(recipeId);
  }

  @GrpcMethod('RecipeService', 'GetRandomRecipes')
  async getRandomRecipe(randomRecipeReq: RandomRecipesRequest) {
    const recipeList = await this.recipeService.getRandomRecipe(
      randomRecipeReq.tags,
      randomRecipeReq.includeIngredients,
      randomRecipeReq.excludeIngredients,
      randomRecipeReq.excludeUtensils,
      randomRecipeReq.caloriesMin,
      randomRecipeReq.caloriesMax,
      randomRecipeReq.recipeNumber,
    );
    console.log(recipeList);

    return { recipeList };
  }

  @GrpcMethod('RecipeService', 'GetRecipeViewModel')
  async getRecipeViewModel() {
    return await this.recipeService.getRecipeViewModel();
  }
}
