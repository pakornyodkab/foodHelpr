import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurants/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

@Module({
  imports: [RestaurantModule, MongooseModule.forRoot(process.env.DATABASE_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
