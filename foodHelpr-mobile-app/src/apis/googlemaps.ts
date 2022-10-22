import axios, { AxiosInstance } from "axios";
import { LatLng } from "react-native-maps";
import { GOOGLEMAPS_KEY } from "@env";

export default class GoogleMapsApi {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "https://maps.googleapis.com/maps/api/",
      timeout: 5000,
    });
  }

  ReverseGeocode(coordinate: LatLng) {
    return this.client.get("geocode/json", {
      params: {
        latlng: `${coordinate.latitude},${coordinate.longitude}`,
        key: GOOGLEMAPS_KEY,
        language: "en",
        result_type: "street_address",
      },
    });
  }
}
