import axios, { AxiosInstance } from "axios";
import { NOTIFICATION_URI } from "@env";

export interface IGetTokenResponse {
  message: string;
  access_token: string;
}

export default class NotificationService {
  private client: AxiosInstance;
  private accessToken: string;

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: NOTIFICATION_URI,
      //baseURL: "http://10.0.2.2:3000/notification/",
      timeout: 10000,
    });
    this.accessToken = accessToken;
  }

  sendExpotoken(expoToken: string) {
    return this.client.post(
      `save-expo-token/${expoToken}`,
      {},
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }

  removeExpoToken(expoToken: string) {
    return this.client.post(
      `remove-expo-token/${expoToken}`,
      {},
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }
}
