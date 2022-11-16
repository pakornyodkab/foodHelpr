import { IsNotEmpty } from 'class-validator';

export class HandleDisconnectDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roomId: string;
}
