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
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetCurrentUserId } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('test-notification')
  @UseGuards(JwtAuthGuard)
  testNotification(@Query('msg') message: string) {
    return this.notificationService.testNotification(message);
  }

  // @Get('get-restaurant-in-range')
  // @UseGuards(JwtAuthGuard)
  // getRestaurantInRange(
  //   @Query('lat') lat: number,
  //   @Query('lng') lng: number,
  //   @Query('range') range: number,
  // ) {
  //   return this.restaurantService.getRestaurantInRange(
  //     lat,
  //     lng,
  //     range
  //   );
  // }

  @Post('save-expo-token')
  @UseGuards(JwtAuthGuard)
  saveExpoToken(
    @GetCurrentUserId() userId: number,
    @Query('expoToken') token: string,
  ) {
    return this.notificationService.saveExpoToken(userId, token);
  }
}
