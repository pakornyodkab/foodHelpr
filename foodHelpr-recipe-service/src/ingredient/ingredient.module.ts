import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientSchema } from '../models/ingredient.model';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
