import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { CreateHostPartyDto } from 'src/dto/createHostParty.dto';
import { forkJoin } from 'rxjs';
import { GuestJoinPartyDto } from 'src/dto/guestJoinParty.dto';
import { HostPartyActionDto } from 'src/dto/hostPartyAction.dto';

@Injectable()
export class PartyService {
  constructor(
    @Inject('FOODFRIEND') private readonly foodFriendService: ClientProxy,
    @Inject('USER') private readonly userService: ClientProxy,
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
      const memberIds = [
        ...new Set(parties.map((party) => party.memberList).flat()),
      ];
      let memberData = [];
      await forkJoin(
        memberIds.map((id) =>
          this.userService.send({ cmd: 'getUserById' }, id),
        ),
      ).forEach((data) => (memberData = data));
      parties.forEach(
        (party) =>
          (party.memberList = party.memberList.map((member) =>
            memberData.find((data) => data.user_id.toString() === member),
          )),
      );
      return parties;
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

  hostPartyAction(hostPartyActionDto: HostPartyActionDto) {
    return this.foodFriendService.send<any, HostPartyActionDto>(
      { cmd: 'hostPartyAction' },
      hostPartyActionDto,
    );
  }

  getGuestPartyViewModel() {
    return this.foodFriendService.send({ cmd: 'getGuestPartyViewModel' }, {});
  }
}
