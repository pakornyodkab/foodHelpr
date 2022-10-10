import { IsNotEmpty } from 'class-validator';

export class HandleConnectionDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  registrationToken: string;
}
