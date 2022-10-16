import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { Party } from './party.model';
  import { Model } from 'mongoose';
  import { InjectModel } from '@nestjs/mongoose';
  import { CreateHostPartyDto } from './dto/createHostParty.dto';

@Injectable()
export class PartyService {
    private LOGGER: Logger;
    private MIN_RESTAURANT_DISTANCE = 0;
    private MAX_RESTAURANT_DISTANCE = 10;
    private MIN_RESTAURANT_RANDOM_NUMBER = 1;
    private MAX_RESTAURANT_RANDOM_NUMBER = 10;

    constructor(
        @InjectModel('Party')
        private readonly partyModel: Model<Party>,
    ) {
        this.LOGGER = new Logger();
    }

    async getHostPartyById(id: string) {
        return await this.partyModel.findById(id);
    }

    async getHostParty() {
        return await this.partyModel.find();
    }

    async createHostParty(createPartyDto: CreateHostPartyDto) {
        const party = new this.partyModel({
            name: createPartyDto.name,
            restaurant: createPartyDto.restaurant,
            apptDate: createPartyDto.apptDate,
            memberList: createPartyDto.memberList,
            ageRestriction: createPartyDto.ageRestriction,
            maxGuests: createPartyDto.maxGuests,
            ownerId: createPartyDto.ownerId,
        })
        await party.save()
        return party;
    }



}