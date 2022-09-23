import axios from "axios";
import { LatLng } from "react-native-maps";

const googleApis = axios.create({
  baseURL: "https://www.googleapis.com/",
  timeout: 5000,
});

export default class GoogleApis {
  constructor() {}

  static GetUserData(accessToken: string) {
    return googleApis.get("userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
