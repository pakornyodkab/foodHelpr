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

@Module({
  imports: [
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
