import { IsNotEmpty } from 'class-validator';

export class UserConnectedDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  registrationToken: string;
}
