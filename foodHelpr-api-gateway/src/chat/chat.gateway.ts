import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { SaveChatDto } from 'src/dto/save-chat.dto';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { GetCurrentUserId } from 'src/auth/decorator';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway(3010, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements NestGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  afterInit(server: any) {
    // console.log('Init', server);
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(socket.handshake.query);
    let { userId, roomId, registrationToken } = socket.handshake.query;
    if (!(typeof userId === 'string')) userId = userId?.toString();
    if (!(typeof roomId === 'string')) roomId = roomId?.toString();
    if (!(typeof registrationToken === 'string'))
      registrationToken = registrationToken?.toString();

    console.log('Connect', { userId, roomId, registrationToken });
    this.chatService
      .handleConnection({
        userId: userId.toString(),
        roomId: roomId,
        registrationToken: registrationToken,
      })
      .forEach((x) => console.log(x));
    this.chatService
      .getChats(roomId?.toString())
      .forEach((chats) =>
        process.nextTick(() => socket.emit('allChats', chats)),
      );
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    let { userId, roomId } = socket.handshake.query;
    if (!(typeof userId === 'string')) userId = userId?.toString();
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
    @GetCurrentUserId() userId: number,
    @MessageBody() chat: SaveChatDto,
    @ConnectedSocket() sender: Socket,
  ) {
    console.log('hey', userId);
    console.log('New Chat', chat);
    this.chatService.saveChat(chat).subscribe();
    sender.emit('newChat', chat);
    sender.broadcast.emit('newChat', chat);
  }
}
