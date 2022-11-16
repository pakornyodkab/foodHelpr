import IRestaurant from "./Restaurant";
import IUser from "./User";

export default interface IParty {
  _id: string;
  name: string;
  restaurant: IRestaurant;
  apptDate: string;
  memberList: IUser[];
  pendingMemberList: IUser[];
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
  ownerData: IUser;
}
