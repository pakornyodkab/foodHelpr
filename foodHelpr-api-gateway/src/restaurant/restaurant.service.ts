import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { Coordinate } from 'src/dto/coordinate.dto';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';
import { RandomRequest } from 'src/dto/randomRequest.dto';
import { RandomReqWithBanList } from 'src/dto/randomReqWithBanList.dto';
import { UpdateRestaurantRequest } from 'src/dto/update-restaurant-request';
import { UpdateRestaurantDto } from 'src/dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject('RESTAURANT') private readonly restaurantService: ClientProxy,
    private readonly appService: AppService,
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

  calculateDistances(coordinate1: Coordinate, coordinate2: Coordinate) {
    return this.restaurantService.send(
      { cmd: 'calculateDistance' },
      { c1: coordinate1, c2: coordinate2 },
    );
  }

  async getRandomRestaurant(userId: number, randomRequest: RandomRequest) {
    let userBanList = [];
    await this.appService
      .findRestaurantBanListsByUserId(userId)
      .forEach((e) => userBanList.push(e));
    userBanList = userBanList[0];
    const userBanListId = this.getRestaurantIdFromUserBanList(userBanList);
    return this.restaurantService.send(
      { cmd: 'get-random-restaurant' },
      new RandomReqWithBanList(randomRequest, userBanListId),
    );
  }

  private getRestaurantIdFromUserBanList(userBanList: any) {
    if (!userBanList) {
      return [];
    } else {
      return userBanList.map((e) => e.restaurant_id);
    }
  }
}
