import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';
import { config } from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';

config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FOODFRIEND',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3090,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user-services',
          port: 3001,
        },
      },
    ]),
    HttpModule,
    AuthModule,
  ],
  providers: [ChatGateway, ChatService, AuthService],
})
export class ChatModule {}
