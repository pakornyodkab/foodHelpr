import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyController } from './party.controller';
import { PartySchema } from './party.model';
import { PartyService } from './party.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Party', schema: PartySchema },
    ]),
  ],
  controllers: [PartyController],
  providers: [PartyService],
})
export class PartyModule {}