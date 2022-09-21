import { UpdateUserDto } from './dto/update-user.dto';

export class UpdateUserRequest {
  constructor(public id: number, public updateUserDto: UpdateUserDto) {}
}
