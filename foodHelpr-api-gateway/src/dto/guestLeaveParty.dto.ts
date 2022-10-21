import { IsNotEmpty } from 'class-validator';

export class GuestLeavePartyDto {
  @IsNotEmpty()
  partyId: string;

  @IsNotEmpty()
  memberId: string;

  @IsNotEmpty()
  notiToken: string;
}