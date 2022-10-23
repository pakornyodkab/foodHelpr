import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AcceptedRequest } from './dto/acceptedRequest';
import { RoomCreatedRequest } from './dto/createdRoomRequest';
import { LeaveRequest } from './dto/leaveRequest';
import { PartyGoBoom } from './dto/partyGoBoomRequest';
import { RejectedRequest } from './dto/rejectedRequest';
import { userIdExpoTokenPair } from './dto/userIdExpoTokenPair';
import { WannaJoinRequest } from './dto/wannaJoinRequest';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('test_noti')
  testNoti(msg: string) {
    return this.appService.testNoti(msg);
  }

  @EventPattern('wannaJoin_noti')
  async wannaJoineNoti(msg: WannaJoinRequest) {
    return await this.appService.wannaJoinNoti(msg);
  }

  @EventPattern('accepted_noti')
  async acceptedNoti(msg: AcceptedRequest) {
    return await this.appService.acceptedNoti(msg);
  }

  @EventPattern('rejected_noti')
  async rejectedNoti(msg: RejectedRequest) {
    return await this.appService.rejectedNoti(msg);
  }

  @EventPattern('leave_noti')
  async leaveNoti(msg: LeaveRequest) {
    return await this.appService.leaveNoti(msg);
  }

  // @EventPattern('room_created')
  // roomCreated(msg: RoomCreatedRequest) {
  //   return this.appService.roomCreated(msg);
  // }

  @EventPattern('save_noti_token')
  async addNotiToken(msg: userIdExpoTokenPair) {
    return await this.appService.addNotiToken(msg);
  }

  @EventPattern('remove_noti_token')
  async removeNotiToken(msg: userIdExpoTokenPair) {
    return await this.appService.removeNotiToken(msg);
  }

  @EventPattern('party_go_boom')
  async partyGoBoom(msg: PartyGoBoom) {
    return await this.appService.partyGoBoom(msg);
  }
}
