import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface IRecipeId {
  recipe_id: string;
}

enum Tag {
  TAG_UNSPECIFIED,
  TAG_THAI_FOOD,
  TAG_DESSERT,
  TAG_KOREAN_FOOD,
  TAG_JAPANESE_FOOD,
  TAG_CHINESE_FOOD,
  TAG_SEA_FOOD,
  TAG_VEGAN_FOOD,
  TAG_HEALTHY_FOOD,
  TAG_BEVERAGE,
  TAG_ESAN_FOOD,
}

interface Ingredient {
  name: string;
}

interface IRecipe {
  recipe_id: string;
  name: string;
  tag: Tag[];
  kcal: Number;
  ingredients: Ingredient[];
  method: string[];
  kitchen_tools: string[];
  tutorial_links: string[];
  picture_url: string[];
}

@Controller()
export class RecipeController {
  @GrpcMethod('RecipeService', 'GetById')
  get(recipeId: IRecipeId): IRecipe {
    return {
      kitchen_tools: ['Pot', 'Oven'],
      tutorial_links: ['tutorial_path'],
      picture_url: ['picture_pathee'],
      recipe_id: '1',
      name: 'Krapao',
      tag: [Tag.TAG_THAI_FOOD],
      kcal: 99991,
      ingredients: [{ name: 'wow' }],
      method: ['1.asdshdjkfshikefu', '2.sdfefiujeiofjioe2223'],
    };
  }
}
