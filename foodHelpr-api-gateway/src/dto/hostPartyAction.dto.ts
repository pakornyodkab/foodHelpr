import { IsNotEmpty } from 'class-validator';

export class HostPartyActionDto {
  @IsNotEmpty()
  partyId: string;

  @IsNotEmpty()
  memberId: string;

  @IsNotEmpty()
  action: 'accept' | 'decline';
}
