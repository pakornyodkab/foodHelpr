import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatSchema } from './chat.model';
import { ChatService } from './chat.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
