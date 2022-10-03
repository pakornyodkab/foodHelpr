import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Recipe, RecipeList } from '../utils/recipe.interface';

@Controller()
export class RecipeController implements OnModuleInit {
  private recipeService: any;

  constructor(@Inject('RECIPE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.recipeService = this.client.getService('RecipeService');
  }

  //@UseGuards(JwtAuthGuard)
  @Get('get-recipes')
  async getRecipes(): Promise<RecipeList> {
    let recipeList: any;
    await this.recipeService.getAll({}).forEach((res) => (recipeList = res));
    return recipeList;
  }

  //@UseGuards(JwtAuthGuard)
  @Get('get-recipe-by-id/:id')
  async getRecipeById(@Param('id') id: string): Promise<Recipe> {
    let recipe: any;
    try {
      await this.recipeService
        .getById({ recipeId: id })
        .forEach((res: any) => (recipe = res));
    } catch (error) {
      throw new NotFoundException('Recipe Not Found !!!');
    }
    return recipe;
  }

  //@UseGuards(JwtAuthGuard)
  @Post('create-recipe')
  async createRecipe(@Body() recipe: Recipe): Promise<Recipe> {
    const newRecipe = await this.recipeService.create(recipe);
    return newRecipe;
  }

  //@UseGuards(JwtAuthGuard)
  @Patch('update-recipe/:id')
  async updateRecipeById(
    @Param('id') id: string,
    @Body() recipe: Recipe,
  ): Promise<Recipe> {
    let newRecipe: any;
    try {
      await this.recipeService
        .updateById({ recipeId: id, ...recipe })
        .forEach((res: any) => (newRecipe = res));
    } catch (error) {
      throw new NotFoundException('Recipe Not Found !!!');
    }
    return newRecipe;
  }

  //@UseGuards(JwtAuthGuard)
  @Delete('delete-recipe/:id')
  async deleteRecipeById(@Param('id') id: string): Promise<object> {
    await this.recipeService
      .deleteById({ recipeId: id })
      .forEach((res: any) => console.log(res));
    return { msg: 'Delete Successfully !!!' };
  }
}
