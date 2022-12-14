import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateUserRequest } from './update-user-request';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'getUsers' })
  getUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUser(id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @MessagePattern({ cmd: 'editUserById' })
  editUser(updateUserRequest: UpdateUserRequest) {
    return this.usersService.update(
      updateUserRequest.id,
      updateUserRequest.updateUserDto,
    );
  }

  @MessagePattern({ cmd: 'deleteUserById' })
  deleteUser(id: number) {
    return this.usersService.remove(id);
  }
}
