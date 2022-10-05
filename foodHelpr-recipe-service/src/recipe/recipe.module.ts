import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { RecipeSchema } from '../models/recipe.model';
import { IngredientSchema } from '../models/ingredient.model';

config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema } , { name: 'Ingredient' , schema: IngredientSchema}]),
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
