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
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
    private readonly restaurantService: RestaurantService,
    private readonly appService: AppService,
  ) {}

  getAllParty() {
    return this.foodFriendService.send({ cmd: 'getAllParty' }, {});
  }

  getPartyById(id: string) {
    return this.foodFriendService.send({ cmd: 'getPartyById' }, id);
  }

  getHostParty() {
    return this.foodFriendService.send({ cmd: 'getHostParty' }, {});
  }

  async getPartyListByUserId(id: string) {
    try {
      let parties = [];
      await this.foodFriendService
        .send({ cmd: 'getPartyListByUserId' }, id)
        .forEach((resultParties) => (parties = resultParties));
      return await this.populateMemberInPartyList(parties);
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async createHostParty(createHostPartyDto: CreateHostPartyDto) {
    let hostPartyResult;
    await this.foodFriendService
      .send<CreateHostPartyDto>({ cmd: 'createHostParty' }, createHostPartyDto)
      .forEach((data) => (hostPartyResult = data));

    // const sendMessage = {
    //   roomId: hostPartyResult._id,
    //   // host: createHostPartyDto.ownerId,
    //   hostNotiToken: createHostPartyDto.notiToken,
    // };
    // this.notificationClient.emit('room_created', sendMessage);
    return hostPartyResult;
  }

  async deleteHostParty(id: string, userId: number) {
    let party;
      await this.getPartyById(id).forEach(
        (partyResult) => (party = partyResult),
      );
    const sendMessage = {
      room: party,
      hostId: userId,
    }
    this.notificationClient.emit('party_go_boom', sendMessage);
    return this.foodFriendService.send<String>({ cmd: 'deleteHostParty' }, id);
  }

  deleteAllHostParty() {
    return this.foodFriendService.send({ cmd: 'deleteAllHostParty' }, {});
  }

  getHostPartyViewModel() {
    return this.foodFriendService.send({ cmd: 'getHostPartyViewModel' }, {});
  }

  async guestJoinParty(guestJoinPartyDto: GuestJoinPartyDto) {
    let userData;
    await this.userService
      .send({ cmd: 'getUserById' }, guestJoinPartyDto.memberId)
      .forEach((data) => (userData = data));
    let party;
    await this.getPartyById(guestJoinPartyDto.partyId).forEach(
      (partyResult) => (party = partyResult),
    );
    const sendMessage = {
      joinerName: userData.firstname,
      room: party,
    };
    this.notificationClient.emit('wannaJoin_noti', sendMessage);
    return this.foodFriendService.send<any, GuestJoinPartyDto>(
      { cmd: 'guestJoinParty' },
      guestJoinPartyDto,
    );
  }

  async guestLeaveParty(guestLeavePartyDto: GuestLeavePartyDto) {
    let userData;
    await this.userService
      .send({ cmd: 'getUserById' }, guestLeavePartyDto.memberId)
      .forEach((data) => (userData = data));
    let party;
    await this.getPartyById(guestLeavePartyDto.partyId).forEach(
      (partyResult) => (party = partyResult),
    );
    const sendMessage = {
      leaverId: guestLeavePartyDto.memberId,
      leaverName: userData.firstname,
      room: party,
    };
    this.notificationClient.emit('leave_noti', sendMessage);
    return this.foodFriendService.send<any, GuestLeavePartyDto>(
      { cmd: 'guestLeaveParty' },
      guestLeavePartyDto,
    );
  }

  async hostPartyAction(hostPartyActionDto: HostPartyActionDto) {
    let userData;
    await this.userService
      .send({ cmd: 'getUserById' }, hostPartyActionDto.memberId)
      .forEach((data) => (userData = data));
    if (hostPartyActionDto.action === 'accept') {
      let party;
      await this.getPartyById(hostPartyActionDto.partyId).forEach(
        (partyResult) => (party = partyResult),
      );
      const sendMessage = {
        joinerName: userData.firstname,
        joinerId: hostPartyActionDto.memberId,
        room: party,
      };
      this.notificationClient.emit('accepted_noti', sendMessage);
    } else if (hostPartyActionDto.action === 'decline') {
      const sendMessage = {
        joinerId: hostPartyActionDto.memberId,
      };
      this.notificationClient.emit('rejected_noti', sendMessage);
    }
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
