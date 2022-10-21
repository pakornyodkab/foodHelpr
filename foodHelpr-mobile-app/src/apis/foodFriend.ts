import axios from "axios";
import { FOOD_FRIEND_URI } from "@env";

const foodFriendService = axios.create({
  baseURL: FOOD_FRIEND_URI,
  timeout: 10000,
});

export interface IGetPartyInRangeRequest{}

export interface IGetPartyInRangeResponse{}

export default class FoodFriendService {
  constructor() {}

  static GetPartyInRange = (accessToken: string , requestParams: IGetPartyInRangeRequest) => {
    const request = foodFriendService.get<IGetPartyInRangeResponse[]>(
      "get-party-in-range",{
        params: {
          // lat: requestParams.latitude,
          // lng: requestParams.longitude,
          // range: requestParams.range,
        },
        headers: { Authorization: `Bearer ${accessToken}` }
      },
        
    );
    return request;
  }
}
