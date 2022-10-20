import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyController } from './party.controller';
import { PartySchema } from './party.model';
import { PartyService } from './party.service';
import { RestaurantSchema } from '../../external/model/restaurant.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Party', schema: PartySchema }]),
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantSchema },
    ]),
  ],
  controllers: [PartyController],
  providers: [PartyService],
})
export class PartyModule {}
