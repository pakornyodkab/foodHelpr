import * as mongoose from 'mongoose';
import { Recipe } from '../utils/recipe.interface';
import { Tag } from '../utils/constant';

export const RecipeSchema = new mongoose.Schema<Recipe>({
  recipeId: String,
  name: String,
  tags: {
    type: [String],
    enum: Tag,
  },
  kcal: Number,
  ingredients: {
    type: [
      {
        name: String,
      },
    ],
  },
  method: [String],
  kitchenTools: [String],
  tutorialLinks: [String],
  pictureUrl: [String],
});
