import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  RandomRecipesRequest,
  Recipe,
  RecipeId,
  RecipeList,
} from '../utils/recipe.interface';
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

  async getRandomRecipe(
    tags: Tag[],
    includeIngredients: string[],
    excludeIngredients: string[],
    excludeUtensils: string[],
    caloriesMin: Number,
    caloriesMax: Number,
    recipeNumber: Number,
  ) {
    if (recipeNumber <= 0) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Recipe number cannot equal or less than zero',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    let filter = [];
    console.log(tags);
    if (tags?.length > 0) {
      filter.push({ tags: { $in: tags } });
    }
    // danger 1
    if (caloriesMin) {
      if (Number.isNaN(caloriesMin) || caloriesMin < 0) {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Calories Min cannot equal or less than zero',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      filter.push({ kcal: { $gte: caloriesMin } });
    } else {
      caloriesMin = 0;
    }
    // danger 2
    if (caloriesMax) {
      if (
        Number.isNaN(caloriesMax) ||
        caloriesMax < 0 ||
        caloriesMin > caloriesMax
      ) {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Calories Max is invalid',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      filter.push({ kcal: { $lte: caloriesMax } });
    }
    // danger 3
    if (excludeIngredients?.length > 0) {
      filter.push({
        'ingredients.ingredientId': { $not: { $in: excludeIngredients } },
      });
    }
    if (includeIngredients?.length > 0) {
      filter.push({
        'ingredients.ingredientId': { $in: includeIngredients },
      });
    }
    // danger 4
    if (excludeUtensils?.length > 0) {
      filter.push({
        kitchenTools: { $not: { $in: excludeUtensils } },
      });
    }
    let remainedRecipe: any;
    if (filter.length > 0) {
      remainedRecipe = await this.recipeModel
        .find({ $and: filter })
        .populate('ingredients.ingredientId')
        .exec();
    } else {
      remainedRecipe = await this.recipeModel
        .find({})
        .populate('ingredients.ingredientId')
        .exec();
    }
    console.log(remainedRecipe);
    // danger 5
    if (remainedRecipe.length <= recipeNumber) {
      return remainedRecipe.map((e) => {
        return this.mapper(e);
      });
    } else {
      return remainedRecipe
        .sort(() => Math.random() - Math.random())
        .slice(0, recipeNumber as number)
        .map((e) => {
          return this.mapper(e);
        });
    }
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
