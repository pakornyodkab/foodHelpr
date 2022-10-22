import IRestaurant from "./Restaurant";
import IUser from "./User";

export default interface IParty {
  _id: string;
  name: string;
  restaurant: IRestaurant;
  apptDate: string;
  memberList: IUser[];
  ageRestriction: number;
  maxGuests: number;
  owner: IUser;
}
