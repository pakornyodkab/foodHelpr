import { UpdateRestaurantDto } from './update-restaurant.dto';

export class UpdateRestaurantRequest {
  constructor(
    public id: string,
    public updateRestaurantDto: UpdateRestaurantDto,
  ) {}
}
