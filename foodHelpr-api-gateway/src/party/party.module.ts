import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from '../app.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FOODFRIEND',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3090,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user-services',
          port: 3001,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'RESTAURANT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    HttpModule,
    RestaurantModule,
  ],
  controllers: [PartyController],
  providers: [PartyService, AuthService, JwtService, AppService, RestaurantService],
})
export class PartyModule {}