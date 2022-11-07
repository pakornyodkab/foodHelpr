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
import consul from '../utils/consul';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FOODFRIEND',
        useFactory: async (...args) => ({
          transport: Transport.TCP,
          options: await consul('foodfriend-service'),
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'USER',
        useFactory: async (...args) => ({
          transport: Transport.TCP,
          options: await consul('user-service'),
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'RESTAURANT',
        useFactory: async (...args) => ({
          transport: Transport.TCP,
          options: await consul('restaurant-service'),
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATION_SERVICE',
        useFactory: async (...args) => {
          // const { host, port } = await consul('notification-service');
          const { host, port } = await consul('rabbitmq:rabbitmq');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${host}:${port}`],
              queue: 'notification_queue',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
    HttpModule,
    RestaurantModule,
  ],
  controllers: [PartyController],
  providers: [
    PartyService,
    AuthService,
    JwtService,
    AppService,
    RestaurantService,
  ],
})
export class PartyModule {}
