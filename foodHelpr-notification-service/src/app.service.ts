import { Injectable } from '@nestjs/common';
import { AcceptedRequest } from './dto/acceptedRequest';
import { RoomCreatedRequest } from './dto/createdRoomRequest';
import { LeaveRequest } from './dto/leaveRequest';
import { RejectedRequest } from './dto/rejectedRequest';
import { WannaJoinRequest } from './dto/wannaJoinRequest';
import { messaging } from 'firebase-admin';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationToken } from './app.model';
import { userIdExpoTokenPair } from './dto/userIdExpoTokenPair';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('NotificationToken')
    private readonly notificationTokenModel: Model<NotificationToken>,
  ) {}
  // private roomHost = new Map<string, string>(); // {roomId, host noti id}
  // private roomMembers = new Map<string, Array<string>>(); // {roomId, [member noti ids]}

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
  async leaveNoti(msg: LeaveRequest) {
    const { leaverName, leaverId, room } = msg;

    // const leaverNotiToken = await this.notificationTokenModel.findOne({
    //   userId: leaverId,
    // });

    // const leaverToken = leaverNotiToken.expoToken;

    // if (this.roomHost[roomId] === leaverNotiToken) return;
    if (room.ownerId === leaverId) return;

    // remove leaverId from members
    const index = room.memberList.indexOf(leaverId, 0);
    if (index > -1) {
      room.memberList.splice(index, 1);
    }

    const notiTokens = await this.notificationTokenModel.find({
      userId: { $in: room.memberList },
    });
    const targetNoti = notiTokens.map((e) => e.expoToken).flat();
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
    console.log('host', room.ownerId);
    console.log('member', room.memberList);
    return msg;
  }

  async wannaJoinNoti(msg: WannaJoinRequest) {
    console.log(msg);
    const { room, joinerName } = msg;
    const hostNotiToken = await this.notificationTokenModel.findOne({
      userId: room.ownerId,
    });
    const targetNoti = hostNotiToken.expoToken;
    const notiMessage = `${joinerName} want to join your party!`;

    //Send Noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
      // condition: 'I don,t know',
    };

    //*FB
    // messaging()
    //   .send(message)
    //   .then((response) => {
    //     // Response is a message ID string.
    //     console.log('Successfully sent message:', response);
    //   })
    //   .catch((error) => {
    //     console.log('Error sending message:', error);
    //   });
    messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });

    console.log('wannaJoin has been sent.');
    console.log('Noti message', notiMessage);
    console.log('host', room.ownerId);
    console.log('member', room.memberList);
    return msg;
  }

  // joinerNotiToken used to be joinerId
  async acceptedNoti(msg: AcceptedRequest) {
    const { joinerName, room, joinerId } = msg;
    room.memberList.push(joinerId);
    const notiTokens = await this.notificationTokenModel.find({
      userId: { $in: room.memberList },
    });
    const targetNoti = notiTokens.map((e) => e.expoToken).flat();

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
    console.log('host', room.ownerId);
    console.log('member', room.memberList);
    return msg;
  }

  // joinerNotiToken used to be joinerId
  async rejectedNoti(msg: RejectedRequest) {
    const { joinerId } = msg;
    const notiToken = await this.notificationTokenModel.findOne({
      userId: joinerId,
    });
    const targetNoti = notiToken.expoToken;
    const notiMessage = 'Sorry, you have been rejected from the party host.';

    //send noti to targetNoti
    const message = {
      data: { message: notiMessage },
      tokens: targetNoti,
    };

    //*FB
    // messaging()
    //   .send(message)
    //   .then((response) => {
    //     // Response is a message ID string.
    //     console.log('Successfully sent message:', response);
    //   })
    //   .catch((error) => {
    //     console.log('Error sending message:', error);
    //   });
    messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });

    console.log('rejectedNoti has been sent.');
    console.log('Noti message', notiMessage);
    // console.log('host', this.roomHost)
    // console.log('member', this.roomMembers)
    return msg;
  }

  // hostNotiToken used to be host.
  // roomCreated(msg: RoomCreatedRequest) {
  //   console.log(msg);
  //   const { roomId, hostNotiToken } = msg;
  //   this.roomHost[roomId] = hostNotiToken;
  //   this.roomMembers[roomId] = [hostNotiToken];
  //   console.log('room has been created.');
  //   console.log('host', this.roomHost[roomId]);
  //   console.log('member', this.roomMembers[roomId]);
  //   return 'Room and hosts stored.';
  // }

  async addNotiToken(msg: userIdExpoTokenPair) {
    const { userId, token } = msg;
    const existedNotiToken = await this.notificationTokenModel.findOne({
      userId: userId,
    });
    if (existedNotiToken) {
      existedNotiToken.expoToken.push(token);
      await existedNotiToken.save();
    } else {
      const newNotiToken = new this.notificationTokenModel({
        userId,
        expoToken: token,
      });
      await newNotiToken.save();
    }
    return { msg: 'Add successful' };
  }
}
