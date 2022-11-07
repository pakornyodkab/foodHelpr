import axios, { AxiosInstance } from "axios";

export interface IGetTokenResponse {
  message: string;
  access_token: string;
}

export default class AuthService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: process.env.AUTH_URI,
      //baseURL: "http://10.0.2.2:3000/",
      timeout: Number(process.env.TIMEOUT),
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
