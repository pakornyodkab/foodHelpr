import * as mongoose from 'mongoose';
import { Coordinate } from './dto/coordinate.dto';

export const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  restaurantPictureLink: { type: [String] },
  recommendedDish: { type: [String] },
  tag: { type: [String] },
  coordinate: {
    type: { Latitude: Number, Longitude: Number },
    required: true,
  },
  rating: { type: Number },
  deliveryInfo: { type: [{ platform: String, link: String }] },
});

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  restaurantPictureLink: Array<string>;
  recommendedDish: Array<string>;
  tag: Array<string>;
  coordinate: { Latitude: Number; Longitude: Number };
  rating: number;
  deliveryInfo: Array<{ platform: string; link: string }>;
}
