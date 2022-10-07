import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeliveryType } from '../utils/constant';
import {
  DeliveryInfo,
  Ingredient,
  IngredientId,
} from '../utils/ingredient.interface';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel('Ingredient')
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async createIngredient(newIngredient: Ingredient) {
    const ingredient = new this.ingredientModel(newIngredient);
    await ingredient.save();
    return this.mapper(ingredient);
  }

  async getIngredients() {
    const ingredientList = await this.ingredientModel.find().exec();
    return ingredientList.map((e) => {
      return this.mapper(e);
    });
  }

  async getIngredientById(id: IngredientId) {
    const ingredient = await this.ingredientModel.findById(id.ingredientId);
    return this.mapper(ingredient);
  }

  async updateIngredientById(updatedIngredient: Ingredient) {
    const ingredient = await this.ingredientModel.findByIdAndUpdate(
      updatedIngredient.ingredientId,
      updatedIngredient,
      { new: true },
    );
    console.log('Updated Successfully !!!');
    return this.mapper(ingredient);
  }

  async deleteIngredientById(id: IngredientId) {
    await this.ingredientModel.deleteOne({ _id: id.ingredientId });
    console.log('Deleted Successfully !!!');
    return;
  }

  async updateIngredientByName(ingredient: Ingredient) {
    const newIngredient = await this.ingredientModel.findOneAndUpdate(
      { name: ingredient.name },
      ingredient,
      { returnOriginal: false },
    );
    return newIngredient;
  }

  mapper(ingredient) {
    return {
      ingredientId: ingredient._id.toString(),
      name: ingredient.name,
      pictureUrl: ingredient.pictureUrl,
      deliveryInfo: ingredient.deliveryInfo.map((e) => {
        console.log('deliveryType', e.deliveryType);
        return {
          deliveryType: Object.values(DeliveryType)[e.deliveryType],
          url: e.url,
        } as DeliveryInfo;
      }),
    };
  }
}
