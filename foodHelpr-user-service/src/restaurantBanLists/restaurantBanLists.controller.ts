import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRestaurantBanListDto } from './dto/create-restaurantBanList.dto';
import { RestaurantBanListsService } from './restaurantBanLists.service';

@Controller()
export class RestaurantBanListsController {
  constructor(
    private readonly restaurantBanListsService: RestaurantBanListsService,
  ) {}

  @MessagePattern({ cmd: 'createRestaurantBanList' })
  createRestaurantBanList(
    createRestaurantBanlistDto: CreateRestaurantBanListDto,
  ) {
    return this.restaurantBanListsService.create(createRestaurantBanlistDto);
  }

  @MessagePattern({ cmd: 'findRestaurantBanLists' })
  findAll() {
    return this.restaurantBanListsService.findAll();
  }

  @MessagePattern({ cmd: 'removeRestaurantBanLists' })
  removeRestaurantBanList(id: number) {
    return this.restaurantBanListsService.remove(id);
  }

  @MessagePattern({ cmd: 'findRestaurantBanListByUserId' })
  findRestaurantBanListByUserId(user_id: number) {
    return this.restaurantBanListsService.findBanListById(user_id);
  }
}
