import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HandleConnectionDto } from 'src/dto/handle-connection.dto';
import { HandleDisconnectDto } from 'src/dto/handle-disconnect.dto';
import { SaveChatDto } from 'src/dto/save-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('FOODFRIEND') private readonly foodFriendService: ClientProxy,
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

  getChats(roomId: string) {
    return this.foodFriendService.send({ cmd: 'chat.getChats' }, roomId);
  }

  saveChat(chat: SaveChatDto) {
    return this.foodFriendService.send<SaveChatDto>(
      { cmd: 'chat.saveChat' },
      chat,
    );
  }
}
