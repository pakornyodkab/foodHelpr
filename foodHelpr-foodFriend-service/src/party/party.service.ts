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
import { HostPartyActionDto } from './dto/hostPartyAction.dto';
import { GuestJoinPartyDto } from './dto/guestJoinParty.dto';

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

  async getAllParty() {
    return await this.partyModel.find();
  }

  async getPartyById(id: string) {
    return await this.partyModel
      .find({ memberList: id })
      .populate('restaurant')
      .exec();
  }

  async createHostParty(createPartyDto: CreateHostPartyDto) {
    const party = new this.partyModel({
      name: createPartyDto.name,
      restaurant: createPartyDto.restaurant,
      apptDate: createPartyDto.apptDate,
      memberList: createPartyDto.memberList,
      pendingMemberList: [],
      ageRestriction: createPartyDto.ageRestriction,
      maxGuests: createPartyDto.maxGuests,
      ownerId: createPartyDto.ownerId,
    });
    if (party.ageRestriction <= 0) {
      throw new NotFoundException('age cannot less than or equal 0');
    }
    if (party.maxGuests > 20 || party.maxGuests < 2) {
      throw new NotFoundException('Room guest number is invalid');
    }
    await party.save();
    return party;
  }

  async deleteHostParty(id: string) {
    const result = await this.partyModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Delete Fail');
    }
    return { message: `Delete id:${id} complete` };
  }

  async deleteAllHostParty() {
    const result = await this.partyModel.deleteMany().exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Delete Fail');
    }
    return { message: `Delete All party complete` };
  }

  async guestJoinParty(guestJoinPartyDto: GuestJoinPartyDto) {
    const { partyId, memberId } = guestJoinPartyDto;
    const updateAction = {
      $pullAll: memberId,
    };
    const result = await this.partyModel.updateOne(
      {
        _id: partyId,
      },
      {
        $push: { pendingMemberList: memberId },
      },
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException('Action Fail');
    }
    return { message: `Action party complete` };
  }

  // add accept/decline party guest here
  async hostPartyAction(hostPartyActionDto: HostPartyActionDto) {
    const { partyId, memberId, action } = hostPartyActionDto;
    const updateAction = {
      $pull: { pendingMemberList: memberId },
    };
    if (action === 'accept')
      updateAction['$push'] = {
        memberList: memberId,
      };
    const result = await this.partyModel.updateOne(
      {
        _id: partyId,
      },
      updateAction,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException('Action Fail');
    }
    return { message: `Action party complete` };
  }

  async getHostPartyViewModel() {
    const maxGuest = 20;
    const minGuest = 2;
    const ageRestrictionMin = 1;
    const ageRestrictionMax = 99;
    const maxDistance = 10;

    return {
      maxGuest,
      minGuest,
      ageRestrictionMin,
      ageRestrictionMax,
      maxDistance,
    };
  }

  async getGuestPartyViewModel() {
    const minDistance = 0;
    const maxDistance = 10;
    return {minDistance, maxDistance}
  }

  // async getGuestPartyToJoin(guestGetPartyToJoinDto: )
}
