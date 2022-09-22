import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantBanListsModule } from './restaurantBanLists/restaurantBanLists.module';
import { DatabaseModule } from './typeorm/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, DatabaseModule, RestaurantBanListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
