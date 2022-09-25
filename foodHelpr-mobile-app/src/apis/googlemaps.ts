import axios from "axios";
import { LatLng } from "react-native-maps";
import { GOOGLEMAPS_KEY } from "@env";

const googleMapsApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
  timeout: 5000,
});

export default class GoogleMapsApi {
  constructor() {}

  static ReverseGeocode = (coordinate: LatLng) => {
    const request = googleMapsApi.get(
      `geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${GOOGLEMAPS_KEY}&language=en&result_type=street_address`
    );
    return request;
  }
}
