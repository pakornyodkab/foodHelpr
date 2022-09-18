import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant } from './restaurant.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async getRestaurantById(id: string) {
    return await this.restaurantModel.findById(id);
  }

  async getRestaurants() {
    return await this.restaurantModel.find();
  }

  async deleteRestaurant(id: string) {
    const result = await this.restaurantModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Delete Fail');
    }
    return id;
  }

  async updateRestaurant(
    id: string,
    name,
    address,
    restaurantPictureLink,
    recommendedDish,
    tag,
    coordinate,
    rating,
    deliveryInfo,
  ) {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant Not Found');
    }

    restaurant.name = name;
    restaurant.address = address;
    restaurant.restaurantPictureLink = restaurantPictureLink;
    restaurant.recommendedDish = recommendedDish;
    restaurant.tag = tag;
    restaurant.coordinate = coordinate;
    restaurant.rating = rating;
    restaurant.deliveryInfo = deliveryInfo;
    await restaurant.save();
    return restaurant;
  }

  async createRestaurant(
    name,
    address,
    restaurantPictureLink,
    recommendedDish,
    tag,
    coordinate,
    rating,
    deliveryInfo,
  ) {
    const restaurant = new this.restaurantModel({
      name,
      address,
      restaurantPictureLink,
      recommendedDish,
      tag,
      coordinate,
      rating,
      deliveryInfo,
    });
    await restaurant.save();
    return restaurant;
  }
}
