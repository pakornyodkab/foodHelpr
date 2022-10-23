import { Party } from './room.dto';

export class PartyGoBoom {
  constructor(public room: Party, public hostId: string) {}
}
