import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';
import { config } from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';
import consul from '../utils/consul';

config();

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FOODFRIEND',
        useFactory: async (...args) => ({
          transport: Transport.TCP,
          options: await consul('foodfriend-service'),
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'USER',
        useFactory: async (...args) => ({
          transport: Transport.TCP,
          options: await consul('user-service'),
        }),
      },
    ]),
    HttpModule,
    AuthModule,
  ],
  providers: [ChatGateway, ChatService, AuthService],
})
export class ChatModule {}
