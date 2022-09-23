import axios from "axios";
import { LatLng } from "react-native-maps";
import { LONGDOMAP_KEY } from "@env";

const longdoMapApi = axios.create({
  baseURL: "https://api.longdo.com/map/services/",
  timeout: 5000,
});

export default class LongdoMapApi {
  constructor() {}

  static ReverseGeocode(coordinate: LatLng) {
    return longdoMapApi.get(
      `address?lon=${coordinate.longitude}&lat=${coordinate.latitude}&noelevation=1&key=${LONGDOMAP_KEY}&locale=en`
    );
  }
}
