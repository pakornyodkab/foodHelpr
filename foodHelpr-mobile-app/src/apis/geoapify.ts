import axios from "axios";
import { LatLng } from "react-native-maps";
import { GEOAPIFY_KEY } from "@env";

const geoapifyAPI = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode/",
  timeout: 5000,
});

export default class GeoapifyAPI {
  constructor() {}

  static ReverseGeocode(coordinate: LatLng) {
    console.log(coordinate);
    return geoapifyAPI.get(
      `reverse?lat=${coordinate.latitude}&lon=${coordinate.longitude}&apiKey=${GEOAPIFY_KEY}`
    );
  }
}
