export class AcceptedRequest {
  constructor(
    public joinerName: string,
    // public joinerId: string,
    public joinerNotiToken: string,
    public roomId: string,
  ) {}
}
