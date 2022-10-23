import { Injectable } from '@nestjs/common';
import { AcceptedRequest } from './dto/acceptedRequest';
import { LeaveRequest } from './dto/leaveRequest';
import { RejectedRequest } from './dto/rejectedRequest';
import { WannaJoinRequest } from './dto/wannaJoinRequest';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationToken } from './app.model';
import { userIdExpoTokenPair } from './dto/userIdExpoTokenPair';
import { HttpService } from '@nestjs/axios';
import { PartyGoBoom } from './dto/partyGoBoomRequest';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('NotificationToken')
    private readonly notificationTokenModel: Model<NotificationToken>,
    private readonly httpService: HttpService,
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
    const notiMessage = `${leaverName} has left the party.`;

    //Send noti to targetNoti
    // const message = {
    //   data: { message: notiMessage },
    //   tokens: targetNoti,
    // };

    //message for expo noti
    const message = {
      title: 'FoodHelpr',
      to: targetNoti,
      body: notiMessage,
      data: {
        action: 'leave',
        userId: leaverId,
      },
    };

    await this.httpService.axiosRef.post(
      'https://exp.host/--/api/v2/push/send',
      message,
    );

    //*FB
    // messaging()
    //   .sendMulticast(message)
    //   .then((response) => {
    //     console.log(response.successCount + ' messages were sent successfully');
    //   });

    console.log('leaveNoti has been sent.');
    console.log('Noti message', notiMessage);
    console.log('host', room.ownerId);
    console.log('member', room.memberList);
    return msg;
  }

  async wannaJoinNoti(msg: WannaJoinRequest) {
    console.log(msg);
    const { room, joinerName } = msg;
    const hostNotiToken = await this.notificationTokenModel
      .findOne({
        userId: room.ownerId,
      })
      .exec();
    console.log('query noti token res', hostNotiToken);
    const targetNoti = hostNotiToken.expoToken;
    const notiMessage = `${joinerName} want to join your party!`;

    //Send Noti to targetNoti
    const message = {
      title: 'FoodHelpr',
      to: targetNoti,
      body: notiMessage,
      data: {
        action: 'join',
      },
      // condition: 'I don,t know', // used in firebase.
    };

    // const message = targetNoti.map((token) => {
    //   return {
    //     to: token,
    //   };
    // });

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
    // messaging()
    //   .sendMulticast(message)
    //   .then((response) => {
    //     console.log(response.successCount + ' messages were sent successfully');
    //   });

    await this.httpService.axiosRef.post(
      'https://exp.host/--/api/v2/push/send',
      message,
    );

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
    // const message = {
    //   data: { message: notiMessage },
    //   tokens: targetNoti,
    // };

    //message for expo noti
    const message = {
      title: 'FoodHelpr',
      to: targetNoti,
      body: notiMessage,
      data: {
        action: 'accept',
        userId: joinerId,
      },
    };

    await this.httpService.axiosRef.post(
      'https://exp.host/--/api/v2/push/send',
      message,
    );

    //*FB
    // messaging()
    //   .sendMulticast(message)
    //   .then((response) => {
    //     console.log(response.successCount + ' messages were sent successfully');
    //   });

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
    // const message = {
    //   data: { message: notiMessage },
    //   tokens: targetNoti,
    // };

    //message for expo noti
    const message = {
      title: 'FoodHelpr',
      to: targetNoti,
      body: notiMessage,
      data: {
        action: 'reject',
        userId: joinerId,
      },
    };

    await this.httpService.axiosRef.post(
      'https://exp.host/--/api/v2/push/send',
      message,
    );

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
    // messaging()
    //   .sendMulticast(message)
    //   .then((response) => {
    //     console.log(response.successCount + ' messages were sent successfully');
    //   });

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
    console.log('Enter addNoti from RabbitMQ');
    const existedNotiToken = await this.notificationTokenModel.findOne({
      userId: userId.toString(),
    });
    if (existedNotiToken) {
      if (!existedNotiToken.expoToken.includes(token)) {
        existedNotiToken.expoToken.push(token);
        await existedNotiToken.save();
      } else {
        console.log('Token already exist.');
      }
    } else {
      const newNotiToken = new this.notificationTokenModel({
        userId: userId.toString(),
        expoToken: token,
      });
      await newNotiToken.save();
    }
    console.log('save token successful');
    return { msg: 'Add successful' };
  }

  async removeNotiToken(msg: userIdExpoTokenPair) {
    const { userId, token } = msg;
    console.log('Enter removeNoti from RabbitMQ');
    const existedNotiToken = await this.notificationTokenModel.findOne({
      userId: userId.toString(),
    });
    if (existedNotiToken) {
      // existedNotiToken.expoToken.push(token);
      // await existedNotiToken.save();
      existedNotiToken.expoToken = existedNotiToken.expoToken.filter(
        (currentToken) => currentToken !== token,
      );
      await existedNotiToken.save();
    } else {
      console.log('Noti token not found.');
    }
    // else {
    //   const newNotiToken = new this.notificationTokenModel({
    //     userId,
    //     expoToken: token,
    //   });
    //   await newNotiToken.save();
    // }
    console.log('remove token successful');
    return { msg: 'Add successful' };
  }

  async partyGoBoom(msg: PartyGoBoom) {
    const { room, hostId } = msg;
    console.log('room member', room.memberList);
    const index = room.memberList.indexOf(hostId, 0);
    if (index > -1) {
      room.memberList.splice(index, 1);
    }
    const notiTokens = await this.notificationTokenModel.find({
      userId: { $in: room.memberList },
    });
    const targetNoti = notiTokens.map((e) => e.expoToken).flat();
    console.log('target noti num', targetNoti.length);
    const notiMessage = 'The party you joined has been destroied by host.';

    //message for expo noti
    const message = {
      title: 'FoodHelpr',
      to: targetNoti,
      body: notiMessage,
      data: {
        action: 'goBoom',
        room: room,
      },
    };

    await this.httpService.axiosRef.post(
      'https://exp.host/--/api/v2/push/send',
      message,
    );

    console.log('partyGoBoomNoti has been sent.');
    console.log('Noti message', notiMessage);

    return msg;
  }
}
