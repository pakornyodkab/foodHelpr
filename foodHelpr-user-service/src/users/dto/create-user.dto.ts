import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  profile_picture: string;

  @IsNotEmpty()
  birthdate: Date;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  job: string;
}
