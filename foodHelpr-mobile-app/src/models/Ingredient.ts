export default interface IIngredient {
  ingredient_id: string;
  name: string;
  quantity: number;
  unit: string;
  delivery_info: {
    delivery_type: string;
    url: string;
  }[];
  picture_url: string[];
}
