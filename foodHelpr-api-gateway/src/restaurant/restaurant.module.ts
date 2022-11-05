import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import consul from '../utils/consul';

@Module({
  imports: [
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
        name: 'USER',
        useFactory: async (...args) => ({
          transport: Transport.TCP,
          options: await consul('user-service'),
        }),
      },
    ]),
    HttpModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, AuthService, JwtService, AppService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
