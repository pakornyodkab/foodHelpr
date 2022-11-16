import { IsNotEmpty } from 'class-validator';

export class UserDisconnectedDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roomId: string;
}
