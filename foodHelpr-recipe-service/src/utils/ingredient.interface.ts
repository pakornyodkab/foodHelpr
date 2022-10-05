import { DeliveryType } from './constant';

export interface Ingredient {
  ingredientId: string;
  name: string;
  pictureUrl: string[];
  deliveryInfo: DeliveryInfo[];
}

export interface DeliveryInfo {
  deliveryType: DeliveryType;
  url: string;
}

export interface IngredientId {
  ingredientId: string;
}

export interface IngredientList {
  ingredientList: Ingredient[];
}
