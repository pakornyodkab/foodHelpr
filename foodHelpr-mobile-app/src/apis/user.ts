import axios, { AxiosInstance } from "axios";
import { USER_URI } from "@env";
import IUser from "../models/User";
import { getUser } from "../libs/user";

export interface IGetMyUserResponse extends IUser {}

export default class UserService {
  private client: AxiosInstance;
  private accessToken: string;
  constructor(accessToken: string) {
    this.client = axios.create({
      //baseURL: "http://10.0.2.2:3000/",
      baseURL: USER_URI,
      timeout: 5000,
    });
    this.accessToken = accessToken;
  }

  GetMyUser() {
    return this.client.get<IGetMyUserResponse>("get-my-user", {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  UpdateUserBirthdate(userId: string, birthdate: Date) {
    return this.client.patch(
      `update-user-by-id/${userId}`,
      { birthdate: birthdate },
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
  }
}
