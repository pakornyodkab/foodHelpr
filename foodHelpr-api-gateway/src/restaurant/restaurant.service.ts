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

  getRestaurantById(id: string) {
    return this.restaurantService.send({ cmd: 'getById' }, id);
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

  async getRandomRestaurant(
    userId: number,
    lat: number,
    lng: number,
    randomNumber: number,
    range: number,
    tags: string[],
    deliveryPlatforms: string[],
  ) {
    let userBanList: any;
    await this.appService
      .findRestaurantBanListsByUserId(userId)
      .forEach((value) => (userBanList = value));
    const userBanListId = this.getRestaurantIdFromUserBanList(userBanList);
    const coordinate = new Coordinate(lat, lng);
    const randomReq = new RandomRequest(
      coordinate,
      randomNumber,
      range,
      tags,
      deliveryPlatforms,
    );
    return this.restaurantService.send(
      { cmd: 'get-random-restaurant' },
      new RandomReqWithBanList(randomReq, userBanListId),
    );
  }

  getRandomRestaurantViewModel() {
    return this.restaurantService.send(
      { cmd: 'get-random-restaurant-view-model' },
      {},
    );
  }

  private getRestaurantIdFromUserBanList(userBanList: any) {
    if (!userBanList) {
      return [];
    } else {
      return userBanList.map((e) => e.restaurant_id);
    }
  }

  async getRestaurantInRange(
    lat: number,
    lng: number,
    range: number,
  ) {
    const coordinate = new Coordinate(lat, lng);
    console.log(lat)
    console.log(lng)
    console.log(coordinate)
    return this.restaurantService.send(
      { cmd: 'get-restaurant-in-range' },
      {coordinate, range},
    );
  }
}
