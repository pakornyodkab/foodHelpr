import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { IngredientModule } from './ingredient/ingredient.module';

config();

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    IngredientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
