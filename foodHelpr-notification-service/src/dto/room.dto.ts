export interface Party {
  name: string;
  restaurant: string;
  apptDate: Date;
  memberList: Array<string>;
  pendingMemberList: Array<string>;
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
}
