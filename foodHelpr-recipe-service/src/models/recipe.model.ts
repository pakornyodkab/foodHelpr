import * as mongoose from 'mongoose';
import { Recipe } from '../utils/recipe.interface';
import { Tag } from '../utils/constant';

export const RecipeSchema = new mongoose.Schema<Recipe>({
  name: String,
  tags: {
    type: [String],
    enum: Tag,
  },
  kcal: Number,
  ingredients: {
    type: [
      {
        ingredientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ingredient',
        },
        quantity: Number,
        unit: String,
      },
    ],
  },
  method: {
    type: [
      {
        step: Number,
        title: String,
        subStep: [String],
      },
    ],
  },
  kitchenTools: [String],
  tutorialLinks: [String],
  pictureUrl: [String],
});
