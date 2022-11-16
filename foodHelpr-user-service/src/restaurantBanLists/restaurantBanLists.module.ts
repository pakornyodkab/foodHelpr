import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantBanList } from '../typeorm/entities/restaurantbanlist.entity';
import { RestaurantBanListsController } from './restaurantBanLists.controller';
import { RestaurantBanListsService } from './restaurantBanLists.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantBanList])],
  providers: [RestaurantBanListsService],
  controllers: [RestaurantBanListsController],
})
export class RestaurantBanListsModule {}
