import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('get-restaurants')
  @UseGuards(JwtAuthGuard)
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @Post('create-restaurant')
  @UseGuards(JwtAuthGuard)
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Delete('delete-restaurant-by-restaurant-id/:id')
  @UseGuards(JwtAuthGuard)
  deleteRestaurant(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }

  @Patch('update-restaurant-id/:id')
  @UseGuards(JwtAuthGuard)
  updateRestaurant(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.updateRestaurant(id, updateRestaurantDto);
  }
}
