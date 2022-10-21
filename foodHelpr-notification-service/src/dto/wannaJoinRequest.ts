import { Party } from './room.dto';

export class WannaJoinRequest {
  constructor(public joinerName: string, public room: Party) {}
}
