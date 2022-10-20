import { IsNotEmpty } from 'class-validator';
import IUser from 'src/model/user';

export class GuestFindPartyDto {
  @IsNotEmpty()
  public userId: string;

  @IsNotEmpty()
  public distance: number;

  @IsNotEmpty()
  public location: {
    lat: number;
    lng: number;
  };
}
