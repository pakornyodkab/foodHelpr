import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeId, RecipeList } from '../utils/recipe.interface';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from 'src/dto/update-recipe.dto';
import { DeliveryType, Tag } from '../utils/constant';
import { DeliveryInfo, Ingredient } from 'src/utils/ingredient.interface';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe')
    private readonly recipeModel: Model<Recipe>,
    @InjectModel('Ingredient')
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async createRecipe(newRecipe: Recipe) {
    const recipe = new this.recipeModel(newRecipe);
    await recipe.save();
    const recipeReturn = await recipe.populate('ingredients.ingredientId');
    return this.mapper(recipeReturn);
  }

  async getRecipes() {
    const recipeList = await this.recipeModel
      .find()
      .populate('ingredients.ingredientId')
      .exec();
    return recipeList.map((e) => {
      return this.mapper(e);
    });
  }

  async getRecipeById(id: RecipeId) {
    const recipe = await this.recipeModel
      .findById(id.recipeId)
      .populate('ingredients.ingredientId')
      .exec();
    return this.mapper(recipe);
  }

  async updateRecipeById(updatedRecipe: Recipe) {
    const recipe = await this.recipeModel.findByIdAndUpdate(
      updatedRecipe.recipeId,
      updatedRecipe,
      { new: true },
    );
    const recipeReturn = await recipe.populate('ingredients.ingredientId');
    console.log('Updated Successfully !!!');

    return this.mapper(recipeReturn);
  }

  async deleteRecipeById(id: RecipeId) {
    await this.recipeModel.deleteOne({ _id: id.recipeId });
    console.log('Deleted Successfully !!!');
    return;
  }

  mapper(recipeFromDB) {
    return {
      recipeId: recipeFromDB._id.toString(),
      name: recipeFromDB.name,
      tags: recipeFromDB.tags.map((e) => {
        return Object.values(Tag)[e];
      }),
      kcal: recipeFromDB.kcal,
      ingredients: recipeFromDB.ingredients.map((e) => {
        const ingredient = {
          ingredientId: e.ingredientId._id.toString(),
          name: e.ingredientId.name,
          pictureUrl: e.ingredientId.pictureUrl,
          deliveryInfo: e.ingredientId.deliveryInfo.map((e) => {
            return {
              deliveryType: Object.values(DeliveryType)[e.deliveryType],
              url: e.url,
            } as DeliveryInfo;
          }),
          quantity: e.quantity.toString(),
          unit: e.unit,
        };
        return ingredient;
      }),
      method: recipeFromDB.method.map((e) => {
        return {
          step: e.step,
          title: e.title,
          subStep: e.subStep,
        };
      }),
      kitchenTools: recipeFromDB.kitchenTools,
      tutorialLinks: recipeFromDB.tutorialLinks,
      pictureUrl: recipeFromDB.pictureUrl,
    };
  }
}
