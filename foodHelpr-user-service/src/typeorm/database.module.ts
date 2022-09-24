import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantBanList } from './entities/restaurantbanlist.entity';
import { User } from './entities/user.entity';
import { config } from 'dotenv';

config();
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'foodhelpr',
      entities: [RestaurantBanList, User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
