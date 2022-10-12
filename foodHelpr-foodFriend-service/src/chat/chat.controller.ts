import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { SaveChatDto } from './dto/save-chat.dto';
import { UserConnectedDto } from './dto/user-connected.dto';
import { UserDisconnectedDto } from './dto/user-disconnected.dto';

@Controller()
export class ChatController {
  private LOGGER: Logger;

  constructor(private readonly chatService: ChatService) {
    this.LOGGER = new Logger();
  }

  @MessagePattern({ cmd: 'chat.userConnected' })
  userConnected(userConnectedDto: UserConnectedDto) {
    this.chatService.userConnected(userConnectedDto);
  }

  @MessagePattern({ cmd: 'chat.userDisconnected' })
  userDisconnected(userDisconnectedDto: UserDisconnectedDto) {
    this.chatService.userDisconnected(userDisconnectedDto);
  }

  @MessagePattern({ cmd: 'chat.getChats' })
  async getChats(roomId: string) {
    return await this.chatService.getChats(roomId);
  }

  @MessagePattern({ cmd: 'chat.saveChat' })
  async saveChat(saveChatDto: SaveChatDto) {
    return await this.chatService.saveChat(saveChatDto);
  }
}
