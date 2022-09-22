import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  profile_picture: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  job: string;
}
