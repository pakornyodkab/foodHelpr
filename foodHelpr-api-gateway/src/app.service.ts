import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(@Inject('USER') private readonly userService: ClientProxy) {}

  createUser(data: CreateUserDto) {
    return this.userService.send<CreateUserDto>({ cmd: 'createUser' }, data);
  }
}