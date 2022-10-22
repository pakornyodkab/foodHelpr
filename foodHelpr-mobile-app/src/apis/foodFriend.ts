import axios, { AxiosInstance } from "axios";
import { FOOD_FRIEND_URI } from "@env";
import IRestaurant from "../models/Restaurant";
import IParty from "../models/Party";

export interface ICreateHostParty {
  name: string;
  restaurant: string;
  apptDate: Date;
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
}

export interface ISearchPartyRequest {
  distance: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface IJoinPartyRequest {
  partyId: string;
}

export default class FoodFriendService {
  private client: AxiosInstance;
  private accessToken: string;

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: "http://192.168.43.128:3000/party/",
      //baseURL: "http://10.0.2.2:3000/party/",
      timeout: 10000,
    });
    this.accessToken = accessToken;
  }

  CreateHostParty(requestParams: ICreateHostParty) {
    return this.client.post<IParty[]>(
      "create-host-party",
      {
        name: requestParams.name,
        restaurant: requestParams.restaurant,
        apptDate: requestParams.apptDate,
        ageRestriction: requestParams.ageRestriction,
        maxGuests: requestParams.maxGuests,
        ownerId: requestParams.ownerId,
      },
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }

  GetGuestSearchParty(requestParams: ISearchPartyRequest) {
    return this.client.get("get-guest-find-party-to-join", {
      //ICreateParty
      params: {
        distance: requestParams.distance,
        lat: requestParams.location.lat,
        lng: requestParams.location.lng,
      },
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  GetMyParty() {
    return this.client.get(`get-party-list-by-user-id`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  GuestJoinParty(requestParams: IJoinPartyRequest) {
    return this.client.post(
      "guest-join-party",
      { partyId: requestParams.partyId },
      { headers: { Authorization: `Bearer ${this.accessToken}` } }
    );
  }
}
