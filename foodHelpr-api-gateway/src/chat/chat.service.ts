import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { forkJoin, Observable } from 'rxjs';
import { HandleConnectionDto } from 'src/dto/handle-connection.dto';
import { HandleDisconnectDto } from 'src/dto/handle-disconnect.dto';
import { SaveChatDto } from 'src/dto/save-chat.dto';
import IGetChatsResponse from './models/get-chats.model';

@Injectable()
export class ChatService {
  constructor(
    @Inject('FOODFRIEND') private readonly foodFriendService: ClientProxy,
    @Inject('USER') private readonly userService: ClientProxy,
  ) {}

  handleConnection(handleConnectionDto: HandleConnectionDto) {
    return this.foodFriendService.send<HandleConnectionDto>(
      { cmd: 'chat.userConnected' },
      handleConnectionDto,
    );
  }

  handleDisconnect(handleDisconnectDto: HandleDisconnectDto) {
    return this.foodFriendService.send<HandleDisconnectDto>(
      { cmd: 'chat.userDisconnected' },
      handleDisconnectDto,
    );
  }

  async getChats(roomId: string): Promise<IGetChatsResponse> {
    let allChats;
    await this.foodFriendService
      .send({ cmd: 'chat.getChats' }, roomId)
      .forEach((chats) => {
        allChats = chats;
      });
    console.log(allChats);
    const chatterIds = [...new Set(allChats.map((chat) => chat.senderId))];
    let chatterData = [];
    await forkJoin(
      chatterIds.map((id) => this.userService.send({ cmd: 'getUserById' }, id)),
    ).forEach((data) => (chatterData = data));
    return allChats.map((chat) => {
      return {
        ...chat,
        senderData: chatterData.find(
          (data) => data.user_id.toString() === chat.senderId,
        ),
      };
    });
  }

  saveChat(chat: SaveChatDto) {
    return this.foodFriendService.send<SaveChatDto>(
      { cmd: 'chat.saveChat' },
      chat,
    );
  }
}
