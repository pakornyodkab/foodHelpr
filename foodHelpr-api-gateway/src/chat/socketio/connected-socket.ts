import { SocketData } from '@grpc/grpc-js/build/src/generated/grpc/channelz/v1/SocketData';
import { Socket } from 'socket.io';

export interface IConnectedSocket extends Socket {
  data: Partial<SocketData> & {
    token: string;
    userId: string;
  };
}
