import axios from "axios";
import { USER_URI } from "@env";
import IUser from "../models/User";

const userService = axios.create({
  baseURL: "http://10.0.2.2:3000/",
  timeout: 5000,
});

export interface IGetMyUserResponse extends IUser {}

export default class UserService {
  constructor() {}

  static GetMyUser = (accessToken: string) => {
    console.log("get-my-user", USER_URI);
    const request = userService.get<IGetMyUserResponse>("get-my-user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return request;
  };
}
