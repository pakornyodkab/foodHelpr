import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IngredientService } from './ingredient.service';
import {
  Ingredient,
  IngredientList,
  IngredientId,
} from '../utils/ingredient.interface';

@Controller()
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @GrpcMethod('IngredientService', 'Create')
  createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientService.createIngredient(ingredient);
  }

  @GrpcMethod('IngredientService', 'GetAll')
  async getIngredients(): Promise<IngredientList> {
    const ingredientList = await this.ingredientService.getIngredients();
    return { ingredientList };
  }

  @GrpcMethod('IngredientService', 'GetById')
  async getIngredientById(ingredientId: IngredientId): Promise<Ingredient> {
    return await this.ingredientService.getIngredientById(ingredientId);
  }

  @GrpcMethod('IngredientService', 'UpdateById')
  updateIngredientById(ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientService.updateIngredientById(ingredient);
  }

  @GrpcMethod('IngredientService', 'DeleteById')
  deleteIngredientById(ingredientId: IngredientId) {
    return this.ingredientService.deleteIngredientById(ingredientId);
  }

  @GrpcMethod('IngredientService', 'UpdateByName')
  updateIngredientByName(ingredient: Ingredient) {
    return this.ingredientService.updateIngredientByName(ingredient);
  }

  @GrpcMethod('IngredientService', 'GetByName')
  getIngredientByName(ingredient: Ingredient) {
    return this.ingredientService.getIngredientByName(ingredient);
  }
}
