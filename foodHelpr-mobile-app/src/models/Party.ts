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

// export interface IPartyChat {
//   _id: string;
//   name: string;
//   restaurant: string;
//   memberList: IMember[];
// }

export interface IMember {
  _id: string;
  name: string;
}