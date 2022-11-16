import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRestaurantBanListDto } from './dto/create-restaurantBanList.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user-request';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AppService {
  constructor(@Inject('USER') private readonly userService: ClientProxy) {}

  createUser(data: CreateUserDto) {
    return this.userService.send<CreateUserDto>({ cmd: 'createUser' }, data);
  }

  getUsers() {
    return this.userService.send({ cmd: 'getUsers' }, {});
  }

  getUserById(id: number) {
    return this.userService.send({ cmd: 'getUserById' }, id);
  }

  editUserById(id: number, data: UpdateUserDto) {
    return this.userService.send(
      { cmd: 'editUserById' },
      new UpdateUserRequest(id, data),
    );
  }

  deleteUserById(id: number) {
    return this.userService.send({ cmd: 'deleteUserById' }, id);
  }

  createRestaurantBanList(
    createRestaurantBanListDto: CreateRestaurantBanListDto,
  ) {
    return this.userService.send<CreateRestaurantBanListDto>(
      { cmd: 'createRestaurantBanList' },
      createRestaurantBanListDto,
    );
  }

  findRestaurantBanLists() {
    return this.userService.send({ cmd: 'findRestaurantBanLists' }, {});
  }

  deleteRestaurantBanList(id: number) {
    return this.userService.send<Number>(
      { cmd: 'removeRestaurantBanLists' },
      id,
    );
  }

  findRestaurantBanListsByUserId(user_id: number) {
    return this.userService.send<Number>(
      { cmd: 'findRestaurantBanListByUserId' },
      user_id,
    );
  }
}
