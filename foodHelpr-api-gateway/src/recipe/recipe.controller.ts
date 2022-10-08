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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RandomRecipeRequest } from 'src/dto/randomRecipeRequest.dto';
import { Tag } from 'src/utils/constant';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Recipe, RecipeList } from '../utils/recipe.interface';
import {
  convertRecipeViewModel,
  convertNameToTagNumber,
  convertRandomRecipeResult,
} from './recipe.mapper';

@Controller('recipe')
export class RecipeController implements OnModuleInit {
  private recipeService: any;

  constructor(@Inject('RECIPE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.recipeService = this.client.getService('RecipeService');
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-recipes')
  async getRecipes(): Promise<RecipeList> {
    let recipeList: RecipeList;
    await this.recipeService.getAll({}).forEach((res) => (recipeList = res));
    return recipeList;
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('create-recipe')
  async createRecipe(@Body() recipe: Recipe): Promise<Recipe> {
    const newRecipe = await this.recipeService.create(recipe);
    return newRecipe;
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete('delete-recipe/:id')
  async deleteRecipeById(@Param('id') id: string): Promise<object> {
    await this.recipeService
      .deleteById({ recipeId: id })
      .forEach((res: any) => console.log(res));
    return { msg: 'Delete Successfully !!!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-recipe-view-model')
  async getRecipeViewModel(): Promise<object> {
    let recipeViewModel: any;
    try {
      await this.recipeService
        .getRecipeViewModel({})
        .forEach((res: any) => (recipeViewModel = res));
    } catch (error) {
      throw new NotFoundException('Get Recipe View Model Error!!!');
    }
    return convertRecipeViewModel(recipeViewModel);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-random-recipe')
  async getRandomRecipe(
    @Query('tags') tags: string,
    @Query('include_ingredients') includeIngredients: string,
    @Query('exclude_ingredients') excludeIngredients: string,
    @Query('exclude_utensils') excludeUtensils: string,
    @Query('calories_min') caloriesMin: Number,
    @Query('calories_max') caloriesMax: Number,
    @Query('random_amount') recipeNumber: Number,
  ) {
    let tagUse,
      includeIngredientsUse,
      excludeIngredientsUse,
      excludeUtenUse,
      tagNumber,
      randomRecipes;
    if (tags) {
      tagUse = tags.split(',');
    }
    console.log(tagUse);
    if (includeIngredients) {
      includeIngredientsUse = includeIngredients.split(',');
    }
    if (excludeIngredients) {
      excludeIngredientsUse = excludeIngredients.split(',');
    }
    if (excludeUtensils) {
      excludeUtenUse = excludeUtensils.split(',');
    }
    if (tagUse) {
      tagNumber = convertNameToTagNumber(tagUse);
    }
    const request = new RandomRecipeRequest(
      tagNumber,
      includeIngredientsUse,
      excludeIngredientsUse,
      excludeUtenUse,
      caloriesMin,
      caloriesMax,
      recipeNumber,
    );
    await this.recipeService
      .getRandomRecipes(request)
      .forEach((res: any) => (randomRecipes = res));
    return convertRandomRecipeResult(randomRecipes.recipeList);
  }
}
