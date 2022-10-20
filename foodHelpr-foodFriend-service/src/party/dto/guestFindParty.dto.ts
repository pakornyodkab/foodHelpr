import { IsNotEmpty } from 'class-validator';
import IUser from 'src/model/user';

export class GuestFindPartyDto {
  @IsNotEmpty()
  public user: IUser;

  @IsNotEmpty()
  public distance: number;

  @IsNotEmpty()
  public location: {
    lat: number;
    lng: number;
  };

  @IsNotEmpty()
  public nearbyRestaurants: string[];
}
