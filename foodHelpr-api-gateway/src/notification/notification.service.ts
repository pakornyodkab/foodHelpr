import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { Coordinate } from 'src/dto/coordinate.dto';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';
import { RandomRequest } from 'src/dto/randomRequest.dto';
import { RandomReqWithBanList } from 'src/dto/randomReqWithBanList.dto';
import { UpdateRestaurantRequest } from 'src/dto/update-restaurant-request';
import { UpdateRestaurantDto } from 'src/dto/update-restaurant.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) {}

  async testNotification(
    message: string,
  ) {
    this.notificationClient.emit('test_noti', message)
    return 'Noti has been sent.'
  }
}
