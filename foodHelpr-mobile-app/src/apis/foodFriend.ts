import axios from "axios";
import { FOOD_FRIEND_URI } from "@env";

const foodFriendService = axios.create({
  //baseURL: "http://192.168.43.128:3000/foodFriend/",
  baseURL: "http://10.0.2.2:3000/party/",
  timeout: 10000,
});

export interface IGetAllMyPartyResponse {
  name: string;
  restaurant: string;
  apptDate: Date;
  memberList: Array<string>;
  pendingMemberList: Array<string>;
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
}

export interface ICreateHostParty {
  name: string;
  restaurant: string;
  apptDate: Date;
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
}

export default class FoodFriendService {
  constructor() {}

  static CreateHostParty = (
    accessToken: string,
    requestParams: ICreateHostParty
  ) => {
    const request = foodFriendService.post<ICreateHostParty[]>(
      "create-host-party",
      {
        params: {
          name: requestParams.name,
          restaurant: requestParams.name,
          apptDate: requestParams.apptDate,
          ageRestriction: requestParams.ageRestriction,
          maxGuests: requestParams.maxGuests,
          ownerId: requestParams.ownerId,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return request;
  };
}
