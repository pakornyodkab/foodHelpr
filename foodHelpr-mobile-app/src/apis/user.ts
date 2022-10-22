import axios from "axios";
import { USER_URI } from "@env";
import IUser from "../models/User";
import { getUser } from "../libs/user";

const userService = axios.create({
  //baseURL: "http://10.0.2.2:3000/",
  baseURL: "http://192.168.43.128:3000/",
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

  static UpdateUserBirthdate = async (accessToken: string, birthdate: Date) => {
    const user = await getUser();
    const request = await userService.patch(
      `update-user-by-id/${user.user_id}`,
      { birthdate: birthdate },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("====================================");
    console.log("Update Successfully", request);
    console.log("====================================");
  };
}
