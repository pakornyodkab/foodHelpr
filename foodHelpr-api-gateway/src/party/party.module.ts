import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

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
          host: 'localhost',
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
    HttpModule,
    RestaurantModule,
  ],
  controllers: [PartyController],
  providers: [PartyService, AuthService, JwtService, AppService, RestaurantService],
})
export class PartyModule {}