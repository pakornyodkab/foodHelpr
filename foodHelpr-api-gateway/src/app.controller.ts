import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateRestaurantBanListDto } from './dto/create-restaurantBanList.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Get('get-users')
  getUser() {
    return this.appService.getUsers();
  }

  @Get('get-user-by-id')
  getUserById(@Query('id') id: string) {
    return this.appService.getUserById(id);
  }

  @Put('edit-user-by-id')
  editUserById(@Query('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.editUserById(id, updateUserDto);
  }

  @Delete('delete-user-by-id')
  deleteUserById(@Query('id') id: number) {
    return this.appService.deleteUserById(id);
  }

  @Post('create-restaurant-ban-list')
  createRestaurantBanList(
    @Body() createRestaurantBanListDto: CreateRestaurantBanListDto,
  ) {
    return this.appService.createRestaurantBanList(createRestaurantBanListDto);
  }

  @Get('find-restaurant-ban-lists')
  findRestaurantBanLists() {
    return this.appService.findRestaurantBanLists();
  }

  @Delete('delete-restaurant-ban-list-by-id')
  deleteRestaurantBanList(@Query('id') id: number) {
    return this.appService.deleteRestaurantBanList(id);
  }

  @Get('find-restaurant-ban-lists-by-user-id')
  findRestaurantBanListsByUserId(@Query('user_id') user_id: number) {
    return this.appService.findRestaurantBanListsByUserId(user_id);
  }
}
