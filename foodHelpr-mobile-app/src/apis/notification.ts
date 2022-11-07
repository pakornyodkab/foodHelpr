import axios, { AxiosInstance } from "axios";

export interface IGetTokenResponse {
  message: string;
  access_token: string;
}

export default class NotificationService {
  private client: AxiosInstance;
  private accessToken: string;

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: process.env.NOTIFICATION_URI,
      timeout: Number(process.env.TIMEOUT),
    });
    this.accessToken = accessToken;
  }

  SendExpotoken(expoToken: string) {
    return this.client.post(
      `save-expo-token/${expoToken}`,
      {},
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }

  RemoveExpoToken(expoToken: string) {
    return this.client.post(
      `remove-expo-token/${expoToken}`,
      {},
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }
}
