import axios from "axios";
import { LatLng } from "react-native-maps";
import { GEOAPIFY_KEY } from "@env";

const geoapifyApi = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode/",
  timeout: Number(process.env.TIMEOUT),
});

export default class GeoapifyAPI {
  constructor() {}

  static ReverseGeocode(coordinate: LatLng) {
    return geoapifyApi.get(
      `reverse?lat=${coordinate.latitude}&lon=${coordinate.longitude}&apiKey=${GEOAPIFY_KEY}`
    );
  }
}
