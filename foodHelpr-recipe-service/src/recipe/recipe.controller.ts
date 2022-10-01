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
  recipeId: string;
  name: string;
  tags: Tag[];
  kcal: Number;
  ingredients: Ingredient[];
  method: string[];
  kitchenTools: string[];
  tutorialLinks: string[];
  pictureUrl: string[];
}

@Controller()
export class RecipeController {
  @GrpcMethod('RecipeService', 'GetById')
  get(recipeId: IRecipeId): IRecipe {
    return {
      kitchenTools: ['Pot', 'Oven'],
      tutorialLinks: ['tutorial_path'],
      pictureUrl: ['picture_pathee'],
      recipeId: '1',
      name: 'Krapao',
      tags: [Tag.TAG_THAI_FOOD],
      kcal: 99991,
      ingredients: [{ name: 'wow' }],
      method: ['1.asdshdjkfshikefu', '2.sdfefiujeiofjioe2223'],
    };
  }
}
