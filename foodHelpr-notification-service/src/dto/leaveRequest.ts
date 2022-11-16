import { Party } from './room.dto';

export class LeaveRequest {
  constructor(
    // public leaverId: string,
    public leaverId: string,
    public leaverName: string,
    public room: Party,
  ) {}
}
