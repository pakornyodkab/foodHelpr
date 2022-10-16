import { Injectable } from '@nestjs/common';
import { AcceptedRequest } from './dto/acceptedRequest';
import { RoomCreatedRequest } from './dto/createdRoomRequest';
import { LeaveRequest } from './dto/leaveRequest';
import { RejectedRequest } from './dto/rejectedRequest';
import { WannaJoinRequest } from './dto/wannaJoinRequest';
import { messaging } from 'firebase-admin';

@Injectable()
export class AppService {
  private roomHost = new Map<string, string>(); // {roomId, host noti id}
  private roomMembers = new Map<string, Array<string>>(); // {roomId, [member noti ids]}

  getHello(): string {
    return 'Hello World!';
  }

  testNoti(msg: string) {
    console.log(msg);
    return msg;
  }

  leaveNoti(msg: LeaveRequest) {
    const { leaverName, leaverId, roomId } = msg;

    // remove leaverId from members
    const index = this.roomMembers[roomId].indexOf(leaverId, 0);
    if (index > -1) {
      this.roomMembers[roomId].splice(index, 1);
    }
    const targetNoti = this.roomMembers[roomId];
    const notiMessage = `${leaverName} has leaved the party.`;

    //Send noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
    };
    messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });

    console.log('leaveNoti has been sent.');
    return msg;
  }

  wannaJoineNoti(msg: WannaJoinRequest) {
    console.log(msg);
    const { roomId, joinerName } = msg;
    const targetNoti = this.roomHost[roomId];
    const notiMessage = `${joinerName} want to join your party!`;

    //Send Noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
      condition: 'I don,t know',
    };
    messaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });

    console.log('wannaJoin has been sent.');
    return msg;
  }

  acceptedNoti(msg: AcceptedRequest) {
    const { joinerName, roomId, joinerId } = msg;
    this.roomMembers[roomId].push(joinerId);
    const targetNoti = this.roomMembers[roomId];
    const notiMessage = `${joinerName} has joined the party!`;

    //send noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
    };
    messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });

    console.log('acceptedNoti has been sent.');
    return msg;
  }

  rejectedNoti(msg: RejectedRequest) {
    const { joinerId } = msg;
    const targetNoti = joinerId;
    const notiMessage = 'Sorry, you have been rejected from the party host.';

    //send noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
      condition: 'I don,t know',
    };
    messaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });

    console.log('rejectedNoti has been sent.');
    return msg;
  }

  roomCreated(msg: RoomCreatedRequest) {
    console.log(msg);
    const { roomId, host } = msg;
    this.roomHost[roomId] = host;
    this.roomMembers[roomId] = [host];
    console.log('room has been created.');
    return 'Room and hosts stored.';
  }
}
