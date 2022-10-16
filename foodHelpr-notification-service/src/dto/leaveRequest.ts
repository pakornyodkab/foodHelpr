export class LeaveRequest {
  constructor(
    public leaverId: string,
    public leaverName: string,
    public roomId: string,
  ) {}
}
