import { Party } from './room.dto';

export class AcceptedRequest {
  constructor(
    public joinerName: string,
    public joinerId: string,
    public room: Party,
  ) {}
}
