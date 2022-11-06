import axios, { AxiosInstance } from "axios";
import { FOOD_FRIEND_URI, TIMEOUT } from "@env";
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

export interface IHostEndPartyRequest {
  partyId: string;
}

export interface IGuestLeavePartyRequest {
  partyId: string;
  memberId: string;
}

export interface IHostPartyActionRequest {
  partyId: string;
  memberId: string;
  action: "accept" | "decline";
}

export default class FoodFriendService {
  private client: AxiosInstance;
  private accessToken: string;

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: FOOD_FRIEND_URI,
      //baseURL: "http://10.0.2.2:3000/party/",
      timeout: TIMEOUT,
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

  HostPartyAction(requestParams: IHostPartyActionRequest) {
    return this.client.post(
      "host-party-action",
      {
        partyId: requestParams.partyId,
        memberId: requestParams.memberId,
        action: requestParams.action,
      },
      { headers: { Authorization: `Bearer ${this.accessToken}` } }
    );
  }

  HostEndParty(requestParams: IHostEndPartyRequest) {
    return this.client.delete(`delete-host-party/${requestParams.partyId}`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  GuestLeaveParty(requestParams: IGuestLeavePartyRequest) {
    return this.client.post(
      "guest-leave-party",
      {
        partyId: requestParams.partyId,
        memberId: requestParams.memberId,
      },
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }
}
