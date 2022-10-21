import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { throws } from 'assert';
import { CreateHostPartyDto } from './dto/createHostParty.dto';
import { PartyService } from './party.service';
import { RestaurantNameRequest } from './dto/restaurantNameRequest';
import { HostPartyActionDto } from './dto/hostPartyAction.dto';
import { GuestFindPartyDto } from './dto/guestFindParty.dto';
import { GuestJoinPartyDto } from './dto/guestJoinParty.dto';
import { GuestLeavePartyDto } from './dto/guestLeaveParty.dto';

@Controller()
export class PartyController {
  private LOGGER: Logger;

  constructor(private readonly partyService: PartyService) {
    this.LOGGER = new Logger();
  }

  // @MessagePattern({ cmd : 'getRestaurantName' })
  // getRestaurantName(restaurantNameRequest:RestaurantNameRequest) {
  //     return this.partyService.getRestaurantName(
  //         restaurantNameRequest.coordinate
  //     )
  // }

  @MessagePattern({ cmd: 'getAllParty' })
  getAllParty() {
    return this.partyService.getAllParty();
  }

  @MessagePattern({ cmd: 'getPartyListByUserId' })
  getPartyListByUserId(id: string) {
    return this.partyService.getPartyListByUserId(id);
  }

  @MessagePattern({ cmd: 'getPartyById' })
  getPartyById(id: string) {
    return this.partyService.getPartyById(id);
  }

  @MessagePattern({ cmd: 'createHostParty' })
  createHostParty(createHostPartyDto: CreateHostPartyDto) {
    return this.partyService.createHostParty(createHostPartyDto);
  }

  @MessagePattern({ cmd: 'deleteHostParty' })
  deleteHostParty(id: string) {
    return this.partyService.deleteHostParty(id);
  }

  @MessagePattern({ cmd: 'deleteAllHostParty' })
  deleteAllHostParty() {
    return this.partyService.deleteAllHostParty();
  }

  @MessagePattern({ cmd: 'getHostPartyViewModel' })
  getHostPartyViewModel() {
    this.LOGGER.log('Call Get Host Party View Model');
    return this.partyService.getHostPartyViewModel();
  }

  @MessagePattern({ cmd: 'getGuestFindParty' })
  getGuestFindParty(guestFindPartyDto: GuestFindPartyDto) {
    return this.partyService.guestFindParty(guestFindPartyDto);
  }

  @MessagePattern({ cmd: 'guestJoinParty' })
  guestJoinParty(guestJoinPartyDto: GuestJoinPartyDto) {
    return this.partyService.guestJoinParty(guestJoinPartyDto);
  }

  @MessagePattern({ cmd: 'guestLeaveParty' })
  guestLeaveParty(guestLeavePartyDto: GuestLeavePartyDto) {
    return this.partyService.guestLeaveParty(guestLeavePartyDto);
  }

  @MessagePattern({ cmd: 'hostPartyAction' })
  hostPartyAction(hostPartyActionDto: HostPartyActionDto) {
    return this.partyService.hostPartyAction(hostPartyActionDto);
  }

  @MessagePattern({ cmd: 'getGuestPartyViewModel' })
  getGuestPartyViewModel() {
    this.LOGGER.log('Call Get Guest Party View Model');
    return this.partyService.getGuestPartyViewModel();
  }
}
