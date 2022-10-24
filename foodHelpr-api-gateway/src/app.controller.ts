import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { GetCurrentUserId } from './auth/decorator';
import { GoogleOauthGuard } from './auth/google/google.guard';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { CreateRestaurantBanListDto } from './dto/create-restaurantBanList.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

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
  getUserById(@Param('id') id: number) {
    return this.appService.getUserById(id);
  }

  // @UseGuards(GoogleOauthGuard)
  @Get('user-jwt-token/:googleToken')
  getUserJwtToken(@Param('googleToken') googleToken: string, @Response() res) {
    return this.authService.googleLogin(googleToken, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-my-user')
  getMyUser(@GetCurrentUserId() userId: number) {
    return this.appService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-user-by-id/:id')
  editUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log('====================================');
    console.log(`GET into update ${id}`);
    console.log('====================================');
    return this.appService.editUserById(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-my-user')
  editMyUser(
    @GetCurrentUserId() userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.appService.editUserById(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-user-by-id/:id')
  deleteUserById(@Param('id') id: number) {
    return this.appService.deleteUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-my-user')
  deleteMyUser(@GetCurrentUserId() userId: number) {
    return this.appService.deleteUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-restaurant-ban-list')
  createRestaurantBanList(
    @Body() createRestaurantBanListDto: CreateRestaurantBanListDto,
  ) {
    return this.appService.createRestaurantBanList(createRestaurantBanListDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-my-restaurant-ban-list/:restaurant_id')
  createMyRestaurantBanList(
    @GetCurrentUserId() userId: number,
    @Param('restaurant_id') restaurantId: string,
  ) {
    return this.appService.createRestaurantBanList(
      new CreateRestaurantBanListDto(userId, restaurantId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-restaurant-ban-lists')
  findRestaurantBanLists() {
    return this.appService.findRestaurantBanLists();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-restaurant-ban-list-by-id/:id')
  deleteRestaurantBanList(@Param('id') id: number) {
    return this.appService.deleteRestaurantBanList(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-restaurant-ban-lists-by-user-id')
  findRestaurantBanListsByUserId(@Query('user_id') user_id: number) {
    return this.appService.findRestaurantBanListsByUserId(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-my-restaurant-ban-lists')
  findMyRestaurantBanlists(@GetCurrentUserId() user_id: number) {
    return this.appService.findRestaurantBanListsByUserId(user_id);
  }
}
