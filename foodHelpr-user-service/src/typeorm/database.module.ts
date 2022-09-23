import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantBanList } from './entities/restaurantbanlist.entity';
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 6000,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [RestaurantBanList, User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
