import { IsNotEmpty } from 'class-validator';

export class CreateRestaurantBanListDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  restaurant_id: string;
}
