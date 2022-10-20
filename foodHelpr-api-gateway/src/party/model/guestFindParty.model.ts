import IUser from "src/model/user";

export default interface IGuestFindPartyRequest {
  user: IUser;
  distance: number;
  location: {
    lat: number;
    lng: number;
  };
  nearbyRestaurants: string[];
}
