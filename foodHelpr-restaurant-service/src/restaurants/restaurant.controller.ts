import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('getById')
  async getRestautantById(@Query('id') id: string) {
    return await this.restaurantService.getRestaurantById(id);
  }

  @Get()
  async getRestautants() {
    return await this.restaurantService.getRestaurants();
  }

  @Post('create')
  async createRestaurant(
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('restaurantPictureLink') restaurantPictureLink: Array<string>,
    @Body('recommendedDish') recommendedDish: Array<string>,
    @Body('tag') tag: Array<string>,
    @Body('coordinate') coordinate: string,
    @Body('rating') rating: number,
    @Body('deliveryInfo') deliveryInfo: Array<string>,
  ) {
    return await this.restaurantService.createRestaurant(
      name,
      address,
      restaurantPictureLink,
      recommendedDish,
      tag,
      coordinate,
      rating,
      deliveryInfo,
    );
  }

  @Put('updateById')
  async updateRestaurant(
    @Query('id') id: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('restaurantPictureLink') restaurantPictureLink: Array<string>,
    @Body('recommendedDish') recommendedDish: Array<string>,
    @Body('tag') tag: Array<string>,
    @Body('coordinate') coordinate: string,
    @Body('rating') rating: number,
    @Body('deliveryInfo') deliveryInfo: Array<string>,
  ) {
    const updatedRestaurant = await this.restaurantService.updateRestaurant(
      id,
      name,
      address,
      restaurantPictureLink,
      recommendedDish,
      tag,
      coordinate,
      rating,
      deliveryInfo,
    );
    return updatedRestaurant;
  }

  @Delete('deleteById')
  async deleteRestaurantById(@Query('id') id: string) {
    const deletedId = await this.restaurantService.deleteRestaurant(id);
    return `Delete restaurantId:${deletedId} complete`;
  }
}
