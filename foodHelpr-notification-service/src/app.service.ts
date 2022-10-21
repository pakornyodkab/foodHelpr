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

  //may do latter. Idea is to store map of userId as key and array of userNotiId as value. Then change all targetId logic.
  // private userIdToNotiId = new Map<string, Array<string>>(); // {userId, notiId}

  getHello(): string {
    return 'Hello World!';
  }

  testNoti(msg: string) {
    console.log(msg);
    return msg;
  }

  // leaverNotiToken used to be leaverId
  leaveNoti(msg: LeaveRequest) {
    const { leaverName, leaverNotiToken, roomId } = msg;

    if (this.roomHost[roomId] === leaverNotiToken) return;

    // remove leaverId from members
    const index = this.roomMembers[roomId].indexOf(leaverNotiToken, 0);
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

    //*FB
    messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });

    console.log('leaveNoti has been sent.');
    console.log('Noti message', notiMessage);
    console.log('host', this.roomHost[roomId]);
    console.log('member', this.roomMembers[roomId]);
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

    //*FB
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
    console.log('Noti message', notiMessage);
    console.log('host', this.roomHost[roomId]);
    console.log('member', this.roomMembers[roomId]);
    return msg;
  }

  //่ joinerNotiToken used to be joinerId
  acceptedNoti(msg: AcceptedRequest) {
    const { joinerName, roomId, joinerNotiToken } = msg;
    this.roomMembers[roomId].push(joinerNotiToken);
    const targetNoti = this.roomMembers[roomId];
    const notiMessage = `${joinerName} has joined the party!`;

    //send noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
    };

    //*FB
    messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });

    console.log('acceptedNoti has been sent.');
    console.log('Noti message', notiMessage);
    console.log('host', this.roomHost[roomId]);
    console.log('member', this.roomMembers[roomId]);
    return msg;
  }

  // joinerNotiToken used to be joinerId
  rejectedNoti(msg: RejectedRequest) {
    const { joinerNotiToken } = msg;
    const targetNoti = joinerNotiToken;
    const notiMessage = 'Sorry, you have been rejected from the party host.';

    //send noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
      condition: 'I don,t know',
    };

    //*FB
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
    console.log('Noti message', notiMessage);
    // console.log('host', this.roomHost)
    // console.log('member', this.roomMembers)
    return msg;
  }

  // hostNotiToken used to be host.
  roomCreated(msg: RoomCreatedRequest) {
    console.log(msg);
    const { roomId, hostNotiToken } = msg;
    this.roomHost[roomId] = hostNotiToken;
    this.roomMembers[roomId] = [hostNotiToken];
    console.log('room has been created.');
    console.log('host', this.roomHost[roomId]);
    console.log('member', this.roomMembers[roomId]);
    return 'Room and hosts stored.';
  }
}
