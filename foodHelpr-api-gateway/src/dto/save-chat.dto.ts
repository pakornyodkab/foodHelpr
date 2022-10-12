import { IsNotEmpty } from 'class-validator';

export class SaveChatDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  message: string;
}
