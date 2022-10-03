import * as mongoose from 'mongoose';
import { DeliveryType } from '../utils/constant';
import { Ingredient } from '../utils/ingredient.interface';

export const IngredientSchema = new mongoose.Schema<Ingredient>({
  ingredientId: String,
  name: String,
  pictureUrl: [String],
  deliveryInfo: {
    type: [
      {
        deliveryType: {
          type: String,
          enum: DeliveryType,
        },
        url: String,
      },
    ],
  },
});
