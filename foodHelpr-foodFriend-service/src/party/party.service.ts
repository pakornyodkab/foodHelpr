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
import { GuestFindPartyDto } from './dto/guestFindParty.dto';
import { GuestJoinPartyDto } from './dto/guestJoinParty.dto';
import { GuestLeavePartyDto } from './dto/guestLeaveParty.dto';

@Injectable()
export class PartyService {
  private LOGGER: Logger;
  private MIN_RESTAURANT_DISTANCE = 0;
  private MAX_RESTAURANT_DISTANCE = 10;
  private MIN_RESTAURANT_RANDOM_NUMBER = 1;
  private MAX_RESTAURANT_RANDOM_NUMBER = 10;
  private MAX_GUEST = 20;
  private MIN_GUEST = 2;
  private MIN_AGE = 0;
  private MAX_AGE = 99;

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
    return await this.partyModel.findById(id).exec();
  }

  async getPartyListByUserId(id: string) {
    return await this.partyModel
      .find({
        $or: [{ memberList: id }, { pendingMemberList: id }],
      })
      .populate('restaurant')
      .exec();
  }

  async createHostParty(createHostPartyDto: CreateHostPartyDto) {
    const party = new this.partyModel({
      name: createHostPartyDto.name,
      restaurant: createHostPartyDto.restaurant,
      apptDate: createHostPartyDto.apptDate,
      pendingMemberList: [],
      ageRestriction: createHostPartyDto.ageRestriction,
      maxGuests: createHostPartyDto.maxGuests,
      ownerId: createHostPartyDto.ownerId,
      memberList: [createHostPartyDto.ownerId],
    });
    if (party.ageRestriction < this.MIN_AGE) {
      throw new BadRequestException('age cannot less than 0');
    }
    if (party.ageRestriction > this.MAX_AGE) {
      throw new BadRequestException('age cannot exceed 99');
    }
    if (party.maxGuests > this.MAX_GUEST || party.maxGuests < this.MIN_GUEST) {
      throw new BadRequestException('Room guest number is invalid');
    }
    await party.save();
    return party;
  }

  async deleteHostParty(id: string) {
    const result = await this.partyModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new BadRequestException('Delete Fail');
    }
    return { message: `Delete id:${id} complete` };
  }

  async deleteAllHostParty() {
    const result = await this.partyModel.deleteMany().exec();
    if (result.deletedCount === 0) {
      throw new BadRequestException('Delete Fail');
    }
    return { message: `Delete All party complete` };
  }

  async guestJoinParty(guestJoinPartyDto: GuestJoinPartyDto) {
    const { partyId, memberId } = guestJoinPartyDto;

    const existingParty = await this.partyModel.findOne({
      $and: [
        { _id: partyId },
        { $or: [{ memberList: memberId }, { pendingMemberList: memberId }] },
      ],
    });
    if (existingParty) {
      throw new BadRequestException('Action Fail');
    }

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
      throw new BadRequestException('Action Fail');
    }
    return { message: `Action party complete` };
  }

  // add accept/decline party guest here
  async guestLeaveParty(guestLeavePartyDto: GuestLeavePartyDto) {
    const { partyId, memberId } = guestLeavePartyDto;

    const existingParty = await this.partyModel.findOne({
      _id: partyId,
      memberList: memberId,
    });
    if (!existingParty) {
      throw new BadRequestException('Action Fail');
    }
    if (existingParty.ownerId === memberId) {
      throw new BadRequestException('Host cannot leave their own parties');
    }

    const updateAction = {
      $pullAll: memberId,
    };
    const result = await this.partyModel.updateOne(
      {
        _id: partyId,
      },
      {
        $pull: { memberList: memberId },
      },
    );
    if (result.modifiedCount === 0) {
      throw new BadRequestException('Leave Fail');
    }
    return { message: `Leave party complete` };
  }

  // TODO: disallow if action sender is not actually the host
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
      throw new BadRequestException('Action Fail');
    }
    if (action === 'accept') {
      return { message: `Action party complete` };
    } else {
      throw new BadRequestException('Wrong Action Command');
    }
  }

  async guestFindParty(guestFindPartyDto: GuestFindPartyDto) {
    const age = this.getAge(guestFindPartyDto.user.birthdate);
    const partyList = await this.partyModel
      .find({
        ageRestriction: {
          $lt: age,
        },
        restaurant: {
          $in: guestFindPartyDto.nearbyRestaurants,
        },
        $nor: [
          { memberList: guestFindPartyDto.user.user_id },
          { pendingMemberList: guestFindPartyDto.user.user_id },
        ],
      })
      .populate('restaurant')
      .exec();
    return partyList;
  }

  private getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async getHostPartyViewModel() {
    return {
      maxGuest: this.MAX_GUEST,
      minGuest: this.MIN_GUEST,
      ageRestrictionMin: this.MIN_AGE,
      ageRestrictionMax: this.MAX_AGE,
      maxDistance: this.MAX_RESTAURANT_DISTANCE,
    };
  }

  async getGuestPartyViewModel() {
    return {
      minDistance: this.MIN_RESTAURANT_DISTANCE,
      maxDistance: this.MAX_RESTAURANT_DISTANCE,
    };
  }
}
