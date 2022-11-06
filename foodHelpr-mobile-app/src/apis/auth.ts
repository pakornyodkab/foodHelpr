import axios, { AxiosInstance } from "axios";
import { AUTH_URI, TIMEOUT } from "@env";

export interface IGetTokenResponse {
  message: string;
  access_token: string;
}

export default class AuthService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: AUTH_URI,
      //baseURL: "http://10.0.2.2:3000/",
      timeout: TIMEOUT,
    });
  }

  async GetToken(googleToken: string) {
    const token = await this.client.get<IGetTokenResponse>(
      `user-jwt-token/${googleToken}`
    );
    console.log("GetTokenFromBackend", token);
    return token;
  }
}
