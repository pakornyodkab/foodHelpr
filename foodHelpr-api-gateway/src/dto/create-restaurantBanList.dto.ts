import { IsNotEmpty } from 'class-validator';

export class CreateRestaurantBanListDto {
  @IsNotEmpty()
  id: number;

  constructor(public user_id: number, public restaurant_id: string) {}
}
