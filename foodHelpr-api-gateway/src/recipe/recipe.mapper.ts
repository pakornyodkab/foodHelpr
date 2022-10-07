import e from 'express';
import { DeliveryType, Tag } from 'src/utils/constant';

const TagMap = [
  'UNSPECIFIED',
  'Thai Food',
  'Dessert',
  'Korean Food',
  'Japanese Food',
  'Chinese Food',
  'Sea Food',
  'Vegan Food',
  'Healthy Food',
  'Beverage',
  'Esan Food',
];

export const convertTag = (tags) => {
  return tags.map((e) => {
    return { name: TagMap[e] };
  });
};

export const convertNameToTagNumber = (names) => {
  return names.map((e) => {
    return Tag[TagMap.indexOf(e)];
  });
};

export const convertRecipeViewModel = (recipe) => {
  return {
    tags: convertTag(recipe.tags),
    ingredients: recipe.ingredients,
    utensils: recipe.utensils.map((e: any) => {
      return { name: e };
    }),
    minCal: recipe.minKcal,
    maxCal: recipe.maxKcal,
  };
};

export const convertRandomRecipeResult = (recipe) => {
  return recipe.map((e: any) => {
    return {
      recipe_id: e.recipeId,
      name: e.name,
      picture_url: e.pictureUrl,
      tags: e.tags.map((e) => {
        return TagMap[e];
      }),
      kcal: e.kcal,
      ingredients: convertIngredients(e.ingredients),
      kitchen_tools: e.kitchenTools,
      method: convertMethod(e.method),
      tutorial_links: e.tutorialLinks.map((f) => {
        return { platform: 'YouTube', url: f };
      }),
    };
  });
};

export const convertMethod = (method) => {
  let result = '';
  method.forEach((e) => {
    result += `${e.title}\n`;
    e.subStep.forEach((f) => {
      result += `\t${f}\n`;
    });
  });
  return result;
};

export const convertIngredients = (ingredients) => {
  return ingredients.map((e) => {
    return {
      picture_url: e.pictureUrl,
      delivery_info: e.deliveryInfo.map((e) => {
        return {
          delivery_type: DeliveryType[e.deliveryType],
          url: e.url,
        };
      }),
      ingredient_id: e.ingredientId,
      name: e.name,
      quantity: e.quantity,
      unit: e.unit,
    };
  });
};
