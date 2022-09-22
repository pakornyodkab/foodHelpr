import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject('RESTAURANT') private readonly restaurantService: ClientProxy,
  ) {}

  getRestaurants() {
    return this.restaurantService.send({ cmd: 'getRestautants' }, {});
  }
}
