import * as mongoose from 'mongoose';

export const PartySchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  apptDate: { type: Date, required: true },
  memberList: { type: [String], required: true },
  pendingMemberList: { type: [String], required: true },
  ageRestriction: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  ownerId: { type: String, required: true },
});

export interface Party {
  name: string;
  restaurant: string;
  apptDate: Date;
  memberList: Array<string>;
  pendingMemberList: Array<string>;
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
}

// export const RestaurantSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     restaurantPictureLink: { type: [String] },
//     recommendedDish: { type: [String] },
//     tag: { type: [String] },
//     coordinate: {
//       type: { Latitude: Number, Longitude: Number },
//       required: true,
//     },
//     rating: { type: Number },
//     deliveryInfo: { type: [{ platform: String, link: String }] },
//   });

// const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

// module.exports = {Restaurant}