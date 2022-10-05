import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Ingredient } from 'src/utils/ingredient.interface';
import { DeliveryInfo } from 'src/utils/ingredient.interface';
import { IngredientId } from 'src/utils/ingredient.interface';
import { IngredientList } from 'src/utils/ingredient.interface';

@Controller('ingredient')
export class IngredientController implements OnModuleInit {
  private ingredientService: any;

  constructor(@Inject('INGREDIENT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.ingredientService = this.client.getService('IngredientService');
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-ingredients')
  getIngredients() {
    return this.ingredientService.getAll({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-ingredient-by-id/:ingredientId')
  getIngredientById(@Param('ingredientId') ingredientId: string) {
    return this.ingredientService.GetById({ ingredientId: ingredientId });
  }

  @Post('create-ingredient')
  @UseGuards(JwtAuthGuard)
  createIngredient(@Body() ingredient: Ingredient) {
    return this.ingredientService.Create(ingredient);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-ingredient-by-ingredient-id/:ingredientId')
  deleteIngredient(@Param('ingredientId') ingredientId: string) {
    return this.ingredientService.DeleteById({ ingredientId: ingredientId });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-ingredient-by-ingredient-id')
  updateIngredient(@Body() ingredient: Ingredient) {
    return this.ingredientService.UpdateById(ingredient);
  }
}
