import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';
import { UpdateRestaurantRequest } from 'src/dto/update-restaurant-request';
import { UpdateRestaurantDto } from 'src/dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject('RESTAURANT') private readonly restaurantService: ClientProxy,
  ) {}

  getRestaurants() {
    return this.restaurantService.send({ cmd: 'getRestautants' }, {});
  }

  createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.send<CreateRestaurantDto>(
      { cmd: 'create' },
      createRestaurantDto,
    );
  }

  deleteRestaurant(id: string) {
    return this.restaurantService.send<String>({ cmd: 'deleteById' }, id);
  }

  updateRestaurant(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.send<String, UpdateRestaurantDto>(
      { cmd: 'updateById' },
      new UpdateRestaurantRequest(id, updateRestaurantDto),
    );
  }
}
