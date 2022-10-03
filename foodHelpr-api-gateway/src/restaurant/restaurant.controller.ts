import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GetCurrentUserId } from 'src/auth/decorator/get-current-user-id.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Coordinate } from 'src/dto/coordinate.dto';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';
import { RandomRequest } from 'src/dto/randomRequest.dto';
import { UpdateRestaurantDto } from 'src/dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly authService: AuthService,
  ) {}

  @Get('get-restaurants')
  @UseGuards(JwtAuthGuard)
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @Get('get-restaurant-by-id/:id')
  @UseGuards(JwtAuthGuard)
  getRestaurantById(@Param('id') id: string) {
    return this.restaurantService.getRestaurantById(id);
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

  @Post('calculate-coordinates')
  @UseGuards(JwtAuthGuard)
  calculateDistances(
    @Body('coordinate1') coordinate1: Coordinate,
    @Body('coordinate2') coordinate2: Coordinate,
  ) {
    return this.restaurantService.calculateDistances(coordinate1, coordinate2);
  }

  @Get('get-random-restaurant')
  @UseGuards(JwtAuthGuard)
  getRandomRestaurant(
    @GetCurrentUserId() userId: number,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('random_number') randomNumber: number,
    @Query('range') range: number,
    @Query('tags') tags: string[],
    @Query('delivery_platforms') deliveryPlatforms: string[],
  ) {
    return this.restaurantService.getRandomRestaurant(
      userId,
      lat,
      lng,
      randomNumber,
      range,
      tags,
      deliveryPlatforms,
    );
  }
}
