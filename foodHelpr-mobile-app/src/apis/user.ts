import axios, { AxiosInstance } from "axios";
import IUser from "../models/User";

export interface IGetMyUserResponse extends IUser {}

export default class UserService {
  private client: AxiosInstance;
  private accessToken: string;
  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: process.env.USER_URI,
      timeout: Number(process.env.TIMEOUT),
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
