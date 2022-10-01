import axios from "axios";
import { AUTH_URI } from "@env";

const authService = axios.create({
  baseURL: AUTH_URI,
  timeout: 5000,
});

export interface IGetTokenResponse {
  message: string,
  access_token: string,
}

export default class AuthService {
  constructor() {}

  static GetToken = (accessToken: string) => {
    const request = authService.get<IGetTokenResponse>(`user-jwt-token/${accessToken}`);
    return request;
  };
}
