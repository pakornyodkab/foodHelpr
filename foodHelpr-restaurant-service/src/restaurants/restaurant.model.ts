import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  restaurantPictureLink: { type: [String] },
  recommendedDish: { type: [String] },
  tag: { type: [String] },
  coordinate: {
    type: { latitude: Number, longitude: Number },
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
  coordinate: { latitude: number; longitude: number };
  rating: number;
  deliveryInfo: Array<{ platform: string; link: string }>;
}
