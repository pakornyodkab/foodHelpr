import axios from "axios";
import { AUTH_URI } from "@env";

const authService = axios.create({
  //baseURL: "http://192.168.43.128:3000/",
  baseURL: "http://10.0.2.2:3000/",
  timeout: 5000,
});

export interface IGetTokenResponse {
  message: string;
  access_token: string;
}

export default class AuthService {
  constructor() {}

  static GetToken = (accessToken: string) => {
    console.log(AUTH_URI);

    console.log("here", accessToken);
    const request = authService.get<IGetTokenResponse>(
      `user-jwt-token/${accessToken}`
    );
    console.log("hey", `user-jwt-token/${accessToken}`);
    console.log(
      "Message from get jwt token",
      request.then((res) => console.log(res.data.access_token))
    );
    return request;
  };
}
