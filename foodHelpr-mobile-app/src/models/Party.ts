import IRestaurant from "./Restaurant";

export default interface IParty {
  _id: string;
  partyName: string;
  restaurant: IRestaurant;
  apptDate: string;
  memberList: IMember[];
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
}

export interface IMember {
  _id: string;
  name: string;
}
