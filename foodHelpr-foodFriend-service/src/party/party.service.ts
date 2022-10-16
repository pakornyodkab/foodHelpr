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
        if (party.ageRestriction <= 0) {
            throw new NotFoundException('age cannot less than or equal 0')
        }
        if (party.maxGuests > 20 || party.maxGuests < 2) {
            throw new NotFoundException('Room guest number is invalid')
        }
        await party.save()
        return party;
    }

    async deleteHostParty(id: string) {
        const result = await this.partyModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Delete Fail')
        }
        return { message: `Delete id:${id} complete` };
    }

    async deleteAllHostParty() {
        const result = await this.partyModel.deleteMany().exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Delete Fail')
        }
        return { message: `Delete All party complete` };
    }
    

    // async getGuestPartyToJoin(guestGetPartyToJoinDto: )

}