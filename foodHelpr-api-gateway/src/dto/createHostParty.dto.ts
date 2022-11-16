import { IsNotEmpty } from 'class-validator';

export class CreateHostPartyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  restaurant: string;

  @IsNotEmpty()
  apptDate: Date;

  @IsNotEmpty()
  ageRestriction: number;

  @IsNotEmpty()
  maxGuests: number;

  @IsNotEmpty()
  ownerId: string;
}
