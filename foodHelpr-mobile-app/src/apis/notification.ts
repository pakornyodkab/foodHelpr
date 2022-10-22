import axios from "axios";

const notificationService = axios.create({
  baseURL: "http://192.168.43.128:3000/notification/",
  //baseURL: "http://10.0.2.2:3000/notification/",
  timeout: 5000,
});

export interface IGetTokenResponse {
  message: string;
  access_token: string;
}

export default class NotificationService {
  constructor() {}

  static sendExpotoken = async (accessToken: string, expoToken: string) => {
    console.log("Send Expo Token To Backend", expoToken);
    const request = await notificationService.post(
      `save-expo-token/${expoToken}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("====================================");
    console.log(request);
    console.log("====================================");
  };

  static removeExpoToken = async (accessToken: string, expoToken: string) => {
    console.log("Send Remove Expo Token To Backend", expoToken);
    const request = await notificationService.post(
      `remove-expo-token/${expoToken}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("====================================");
    console.log(request);
    console.log("====================================");
  };
}
