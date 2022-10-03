import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, IngredientId } from '../utils/ingredient.interface';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel('Ingredient')
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async createIngredient(newIngredient: Ingredient) {
    const ingredient = this.ingredientModel.create(newIngredient);
    (await ingredient).save();
    return ingredient;
  }

  async getIngredients() {
    const ingredientList = (await this.ingredientModel
      .find()
      .exec()) as Ingredient[];
    return ingredientList;
  }

  async getIngredientById(id: IngredientId) {
    return await this.ingredientModel.findOne({
      ingredientId: id.ingredientId,
    });
  }

  async updateIngredientById(updatedIngredient: Ingredient) {
    const ingredient = await this.ingredientModel.findOne({
      ingredientId: updatedIngredient.ingredientId,
    });
    if (!ingredient) {
      throw new NotFoundException('Ingredient Not Found !!!');
    }
    await ingredient.updateOne(updatedIngredient);
    await ingredient.save();
    console.log('Updated Successfully !!!');
    return ingredient;
  }

  async deleteIngredientById(id: IngredientId) {
    await this.ingredientModel.deleteOne({ ingredientId: id.ingredientId });
    console.log('Deleted Successfully !!!');
    return;
  }
}
