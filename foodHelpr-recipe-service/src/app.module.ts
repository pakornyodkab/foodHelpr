import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeController } from './recipe/recipe.controller';

@Module({
  imports: [],
  controllers: [AppController, RecipeController],
  providers: [AppService],
})
export class AppModule {}
