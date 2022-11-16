import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { HttpModule } from '@nestjs/axios';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import { PartyModule } from './party/party.module';
import consul from './utils/consul';

@Module({
  imports: [
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
    AuthModule,
    RestaurantModule,
    RecipeModule,
    IngredientModule,
    PartyModule,
    HttpModule,
    ChatModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [JwtService, AppService, AuthService],
})
export class AppModule {}
