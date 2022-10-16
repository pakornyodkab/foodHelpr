import { IsNotEmpty } from 'class-validator';

export class GuestJoinPartyDto {
  @IsNotEmpty()
  partyId: string;

  @IsNotEmpty()
  memberId: string;
}
