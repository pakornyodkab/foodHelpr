import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
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
}
