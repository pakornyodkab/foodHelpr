import axios, { AxiosInstance } from "axios";
import { LatLng } from "react-native-maps";

export default class GoogleApis {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "https://www.googleapis.com/",
      timeout: Number(process.env.TIMEOUT),
    });
  }

  GetUserData(accessToken: string) {
    return this.client.get("userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
