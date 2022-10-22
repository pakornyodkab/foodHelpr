import axios, { AxiosInstance } from "axios";
import { AUTH_URI } from "@env";

export interface IGetTokenResponse {
  message: string;
  access_token: string;
}

export default class AuthService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "http://192.168.43.128:3000/",
      //baseURL: "http://10.0.2.2:3000/",
      timeout: 5000,
    });
  }

  GetToken(googleToken: string) {
    return this.client.get<IGetTokenResponse>(`user-jwt-token/${googleToken}`);
  }
}
