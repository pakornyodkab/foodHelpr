import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeId, RecipeList } from '../utils/recipe.interface';

@Controller()
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @GrpcMethod('RecipeService', 'Create')
  createRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipeService.createRecipe(recipe);
  }

  @GrpcMethod('RecipeService', 'GetAll')
  async getRecipes(): Promise<RecipeList> {
    const recipeList = await this.recipeService.getRecipes();
    return { recipeList };
  }

  @GrpcMethod('RecipeService', 'GetById')
  getRecipeById(recipeId: RecipeId): Promise<Recipe> {
    return this.recipeService.getRecipeById(recipeId);
  }

  @GrpcMethod('RecipeService', 'UpdateById')
  updateRecipeById(recipe: Recipe): Promise<Recipe> {
    return this.recipeService.updateRecipeById(recipe);
  }

  @GrpcMethod('RecipeService', 'DeleteById')
  deleteRecipeById(recipeId: RecipeId) {
    return this.recipeService.deleteRecipeById(recipeId);
  }
}
