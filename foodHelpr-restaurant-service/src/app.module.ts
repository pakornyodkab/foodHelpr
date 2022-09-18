import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurants/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RestaurantModule,
    MongooseModule.forRoot('mongodb://localhost:27017/foodHelpr'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
