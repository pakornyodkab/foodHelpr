import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { CreateRestaurantBanListDto } from './dto/create-restaurantBanList.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-user')
  @UseGuards(JwtAuthGuard)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-users')
  getUser() {
    return this.appService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user-by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-user-by-id/:id')
  editUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.editUserById(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-user-by-id/:id')
  deleteUserById(@Param('id') id: number) {
    return this.appService.deleteUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-restaurant-ban-list')
  createRestaurantBanList(
    @Body() createRestaurantBanListDto: CreateRestaurantBanListDto,
  ) {
    return this.appService.createRestaurantBanList(createRestaurantBanListDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-restaurant-ban-lists')
  findRestaurantBanLists() {
    return this.appService.findRestaurantBanLists();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-restaurant-ban-list-by-id')
  deleteRestaurantBanList(@Param('id') id: number) {
    return this.appService.deleteRestaurantBanList(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-restaurant-ban-lists-by-user-id')
  findRestaurantBanListsByUserId(@Param('user_id') user_id: number) {
    return this.appService.findRestaurantBanListsByUserId(user_id);
  }
}
