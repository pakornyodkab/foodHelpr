import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Chat } from './Chat.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SaveChatDto } from './dto/save-chat.dto';
import { UserConnectedDto } from './dto/user-connected.dto';
import { UserDisconnectedDto } from './dto/user-disconnected.dto';

@Injectable()
export class ChatService {
  private LOGGER: Logger;

  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<Chat>,
  ) {
    this.LOGGER = new Logger();
  }

  private allUsers = [];
  private connectedUsers = {};

  async getChats(roomId: string): Promise<Chat[]> {
    return await this.chatModel.find({ roomId: roomId });
  }

  async saveChat(saveChatDto: SaveChatDto) {
    const createdChat = new this.chatModel(saveChatDto);
    console.log(saveChatDto, createdChat);
    return await createdChat.save();
  }

  userConnected(userConnectedDto: UserConnectedDto) {
    try {
      const { userId, roomId, registrationToken } = userConnectedDto;
      let user = { userId: userId, registrationToken: registrationToken };
      const filteredUsers = this.allUsers.filter((u) => u.userId === userId);
      if (filteredUsers.length == 0) {
        this.allUsers.push(user);
      } else {
        user = filteredUsers[0];
        user.registrationToken = registrationToken;
      }
      if (!(roomId in this.connectedUsers)) this.connectedUsers[roomId] = [];
      this.connectedUsers[roomId].push(userId);
      console.log(`Connect user ${userId} to room ${roomId}`);
      console.log('All Users', this.allUsers);
      console.log('Connected Users', this.connectedUsers);
    } catch (error) {
      console.error(error);
    }
  }

  userDisconnected(userDisconnectedDto: UserDisconnectedDto) {
    try {
      const { userId, roomId } = userDisconnectedDto;
      const userIndex = this.connectedUsers[roomId].indexOf(userId);
      this.connectedUsers[roomId].splice(userIndex, 1);
      console.log(`Disconnect user ${userId} from room ${roomId}`);
      console.log('All Users', this.allUsers);
      console.log('Connected Users', this.connectedUsers);
    } catch (error) {
      console.error(error);
    }
  }
}
