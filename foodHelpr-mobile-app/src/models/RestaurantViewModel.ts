export default interface IRestaurantViewModel {
  tag: {
    name: string;
  }[];
  deliveryPlatform: {
    name: string;
  }[];
  minDistance: number;
  maxDistance: number;
  minRandomNumber: number;
  maxRandomNumber: number;
}
