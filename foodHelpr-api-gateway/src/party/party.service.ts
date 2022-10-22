import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from '../app.service';
import { CreateHostPartyDto } from '../dto/createHostParty.dto';
import { forkJoin } from 'rxjs';
import IGuestFindPartyRequest from './model/guestFindParty.model';
import { GuestFindPartyDto } from '../dto/guestFindParty.dto';
import { GuestJoinPartyDto } from '../dto/guestJoinParty.dto';
import { GuestLeavePartyDto } from '../dto/guestLeaveParty.dto';
import { HostPartyActionDto } from '../dto/hostPartyAction.dto';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class PartyService {
  constructor(
    @Inject('FOODFRIEND') private readonly foodFriendService: ClientProxy,
    @Inject('USER') private readonly userService: ClientProxy,
    private readonly restaurantService: RestaurantService,
    private readonly appService: AppService,
  ) {}

  getAllParty() {
    return this.foodFriendService.send({ cmd: 'getAllParty' }, {});
  }

  getHostParty() {
    return this.foodFriendService.send({ cmd: 'getHostParty' }, {});
  }

  async getPartyById(id: string) {
    try {
      let parties = [];
      await this.foodFriendService
        .send({ cmd: 'getPartyById' }, id)
        .forEach((resultParties) => (parties = resultParties));
      return await this.populateMemberInPartyList(parties);
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  createHostParty(createHostPartyDto: CreateHostPartyDto) {
    return this.foodFriendService.send<CreateHostPartyDto>(
      { cmd: 'createHostParty' },
      createHostPartyDto,
    );
  }

  deleteHostParty(id: string) {
    return this.foodFriendService.send<String>({ cmd: 'deleteHostParty' }, id);
  }

  deleteAllHostParty() {
    return this.foodFriendService.send({ cmd: 'deleteAllHostParty' }, {});
  }

  getHostPartyViewModel() {
    return this.foodFriendService.send({ cmd: 'getHostPartyViewModel' }, {});
  }

  guestJoinParty(guestJoinPartyDto: GuestJoinPartyDto) {
    return this.foodFriendService.send<any, GuestJoinPartyDto>(
      { cmd: 'guestJoinParty' },
      guestJoinPartyDto,
    );
  }

  guestLeaveParty(guestLeavePartyDto: GuestLeavePartyDto) {
    return this.foodFriendService.send<any, GuestLeavePartyDto>(
      { cmd: 'guestLeaveParty' },
      guestLeavePartyDto,
    );
  }

  hostPartyAction(hostPartyActionDto: HostPartyActionDto) {
    return this.foodFriendService.send<any, HostPartyActionDto>(
      { cmd: 'hostPartyAction' },
      hostPartyActionDto,
    );
  }

  async getGuestFindParty(guestFindPartyDto: GuestFindPartyDto) {
    try {
      const { userId, distance, location } = guestFindPartyDto;
      let userData;
      await this.userService
        .send({ cmd: 'getUserById' }, userId)
        .forEach((data) => (userData = data));

      let nearbyRestaurants;
      await this.restaurantService
        .getRestaurantInRange(location.lat, location.lng, distance)
        .forEach((data) => (nearbyRestaurants = data));
      nearbyRestaurants = nearbyRestaurants.map((restaurant) => restaurant._id);

      let parties = [];
      await this.foodFriendService
        .send<any, IGuestFindPartyRequest>(
          { cmd: 'getGuestFindParty' },
          {
            user: userData,
            distance: distance,
            location: location,
            nearbyRestaurants: nearbyRestaurants,
          },
        )
        .forEach((data) => (parties = data));
      return await this.populateMemberInPartyList(parties);
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  private async populateMemberInPartyList(parties: any[]) {
    const memberIds = [
      ...new Set([
        ...parties.map((party) => party.memberList).flat(),
        ...parties.map((party) => party.pendingMemberList).flat(),
      ]),
    ];

    let memberData = [];
    await forkJoin(
      memberIds.map((id) => this.userService.send({ cmd: 'getUserById' }, id)),
    ).forEach((data) => (memberData = data));
    parties.forEach((party) => {
      party.memberList = party.memberList.map((member) =>
        memberData.find((data) => data.user_id.toString() === member),
      );
      party.pendingMemberList = party.pendingMemberList.map((member) =>
        memberData.find((data) => data.user_id.toString() === member),
      );
      party.ownerData = memberData.find(
        (data) => data.user_id.toString() === party.ownerId,
      );
    });
    return parties;
  }

  getGuestPartyViewModel() {
    return this.foodFriendService.send({ cmd: 'getGuestPartyViewModel' }, {});
  }
}
