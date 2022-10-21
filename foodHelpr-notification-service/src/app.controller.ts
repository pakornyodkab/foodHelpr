import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AcceptedRequest } from './dto/acceptedRequest';
import { RoomCreatedRequest } from './dto/createdRoomRequest';
import { LeaveRequest } from './dto/leaveRequest';
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
  wannaJoineNoti(msg: WannaJoinRequest) {
    return this.appService.wannaJoinNoti(msg);
  }

  @EventPattern('accepted_noti')
  acceptedNoti(msg: AcceptedRequest) {
    return this.appService.acceptedNoti(msg);
  }

  @EventPattern('rejected_noti')
  rejectedNoti(msg: RejectedRequest) {
    return this.appService.rejectedNoti(msg);
  }

  @EventPattern('leave_noti')
  leaveNoti(msg: LeaveRequest) {
    return this.appService.leaveNoti(msg);
  }

  // @EventPattern('room_created')
  // roomCreated(msg: RoomCreatedRequest) {
  //   return this.appService.roomCreated(msg);
  // }

  @EventPattern('save_noti_token')
  addNotiToken(msg: userIdExpoTokenPair) {
    return this.appService.addNotiToken(msg);
  }
}
