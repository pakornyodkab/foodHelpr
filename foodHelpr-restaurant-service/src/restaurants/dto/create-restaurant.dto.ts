import { IsNotEmpty } from 'class-validator';
import { Coordinate } from './coordinate.dto';

export class CreateRestaurantDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  restaurantPictureLink: Array<string>;

  @IsNotEmpty()
  recommendedDish: Array<string>;

  @IsNotEmpty()
  tag: Array<string>;

  @IsNotEmpty()
  coordinate: Coordinate;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  deliveryInfo: Array<{ platform: string; link: string }>;
}
