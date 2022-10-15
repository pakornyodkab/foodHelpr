import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantRequest } from './dto/update-restaurant-request';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { Coordinate } from './dto/coordinate.dto';
import { RandomRequest } from './dto/randomRequest.dto';
import { RandomReqWithBanList } from './dto/randomReqWithBanList.dto';

@Controller()
export class RestaurantController {
  private LOGGER: Logger;

  constructor(private readonly restaurantService: RestaurantService) {
    this.LOGGER = new Logger();
  }

  @MessagePattern({ cmd: 'getById' })
  getRestautantsById(id: string) {
    return this.restaurantService.getRestaurantById(id);
  }

  @MessagePattern({ cmd: 'getRestautants' })
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @MessagePattern({ cmd: 'create' })
  creatRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @MessagePattern({ cmd: 'updateById' })
  updateRestaurant(updateRestaurantRequest: UpdateRestaurantRequest) {
    return this.restaurantService.updateRestaurant(
      updateRestaurantRequest.id,
      updateRestaurantRequest.updateRestaurantDto,
    );
  }

  @MessagePattern({ cmd: 'deleteById' })
  deleteRestaurantById(id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }

  @MessagePattern({ cmd: 'calculateDistance' })
  calculateDist(coordinate: any) {
    return this.restaurantService.calculateDistance(
      coordinate.c1,
      coordinate.c2,
    );
  }

  @MessagePattern({ cmd: 'get-random-restaurant' })
  getRandomRestaurant(randomRequest: RandomReqWithBanList) {
    this.LOGGER.log('Call Random Restaurant Function');
    return this.restaurantService.getRandomRestaurant(
      randomRequest.req.coordinate,
      randomRequest.req.randomNumber,
      randomRequest.userBanListId,
      randomRequest.req.range,
      randomRequest.req.tags,
      randomRequest.req.deliveryPlatforms,
    );
  }

  @MessagePattern({cmd:'get-random-restaurant-view-model'})
  getRandomRestaurantViewModel(){
    this.LOGGER.log('Call Get Random Restaurant View Model')
    return this.restaurantService.getRandomRestaurantViewModel()
  }

  @MessagePattern({ cmd: 'get-restaurant-in-range' })
  getRestaurantInRange(randomRequest: {coordinate:Coordinate, range:number}) {
    this.LOGGER.log('Call Restaurant In Range Function');
    return this.restaurantService.getRestaurantInRange(
      randomRequest.coordinate,
      randomRequest.range,
    );
  }
}
