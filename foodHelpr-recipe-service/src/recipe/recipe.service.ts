import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeId, RecipeList } from '../utils/recipe.interface';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from 'src/dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe')
    private readonly recipeModel: Model<Recipe>,
  ) {}

  async createRecipe(newRecipe: Recipe) {
    const recipe = this.recipeModel.create(newRecipe);
    (await recipe).save();
    return recipe;
  }

  async getRecipes() {
    const recipeList = (await this.recipeModel.find().exec()) as Recipe[];
    return recipeList;
  }

  async getRecipeById(id: RecipeId) {
    return await this.recipeModel.findOne({ recipeId: id.recipeId });
  }

  async updateRecipeById(updatedRecipe: Recipe) {
    const recipe = await this.recipeModel.findOne({
      recipeId: updatedRecipe.recipeId,
    });
    if (!recipe) {
      throw new NotFoundException('Recipe Not Found !!!');
    }
    await recipe.updateOne(updatedRecipe);
    await recipe.save();
    console.log('Updated Successfully !!!');
    return recipe;
  }

  async deleteRecipeById(id: RecipeId) {
    await this.recipeModel.deleteOne({ recipeId: id.recipeId });
    console.log('Deleted Successfully !!!');
    return;
  }
}
