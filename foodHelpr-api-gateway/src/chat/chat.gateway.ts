import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { SaveChatDto } from 'src/dto/save-chat.dto';
import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';
import { CustomSocket } from './socketio/socketio.adapter';
import { ClientProxy } from '@nestjs/microservices';
import IGetChatsResponse from './models/get-chats.model';

@WebSocketGateway(3010, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements NestGateway {
  constructor(
    private readonly chatService: ChatService,
    @Inject('USER') private readonly userService: ClientProxy,
  ) {}

  afterInit(server: any) {
    // console.log('Init', server);
  }

  async handleConnection(@ConnectedSocket() socket: CustomSocket) {
    console.log('Mobile Start Connect');
    const userId = socket.user.userId.toString();
    let { roomId, registrationToken } = socket.handshake.query;
    if (!(typeof roomId === 'string')) roomId = roomId?.toString();
    if (!(typeof registrationToken === 'string'))
      registrationToken = registrationToken?.toString();

    socket.join(roomId);

    console.log('Connect', { userId, roomId, registrationToken });
    this.chatService
      .handleConnection({
        userId: userId,
        roomId: roomId,
        registrationToken: registrationToken,
      })
      .forEach((x) => console.log(x));
    const chats = await this.chatService.getChats(roomId?.toString());
    process.nextTick(() => socket.emit('allChats', chats));
  }

  handleDisconnect(@ConnectedSocket() socket: CustomSocket) {
    const userId = socket.user.userId.toString();
    let { roomId } = socket.handshake.query;
    if (!(typeof roomId === 'string')) roomId = roomId?.toString();
    console.log('Disconnect', { userId, roomId });
    this.chatService
      .handleDisconnect({
        userId: userId,
        roomId: roomId,
      })
      .subscribe();
  }

  @SubscribeMessage('chat')
  async handleNewMessage(
    @MessageBody() chat: Partial<SaveChatDto>,
    @ConnectedSocket() socket: CustomSocket,
  ) {
    try {
      const userId = socket.user.userId.toString();
      console.log('New Chat', chat);
      const chatDto: SaveChatDto = {
        message: chat.message,
        roomId: chat.roomId,
        senderId: userId,
      };
      await this.sendNewChatData(chatDto, socket);
    } catch (error) {
      console.error(error);
      throw new WsException(error.message);
    }
  }

  private async sendNewChatData(chatDto: SaveChatDto, socket: CustomSocket) {
    let newChat, userData;
    await this.chatService.saveChat(chatDto).forEach((chat) => {
      newChat = chat;
    });
    await this.userService
      .send({ cmd: 'getUserById' }, chatDto.senderId)
      .forEach((data) => (userData = data));
    const newChatData: IGetChatsResponse = {
      ...newChat,
      senderData: userData,
    };
    socket.emit('newChat', newChatData);
    socket.to(chatDto.roomId).emit('newChat', newChatData);
  }
}
