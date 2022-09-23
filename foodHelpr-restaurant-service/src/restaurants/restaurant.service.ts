import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant } from './restaurant.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

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
    return { message: `Delete id:${id} complete` };
  }

  async updateRestaurant(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant Not Found');
    }

    restaurant.name = updateRestaurantDto.name;
    restaurant.address = updateRestaurantDto.address;
    restaurant.restaurantPictureLink =
      updateRestaurantDto.restaurantPictureLink;
    restaurant.recommendedDish = updateRestaurantDto.recommendedDish;
    restaurant.tag = updateRestaurantDto.tag;
    restaurant.coordinate = {
      Latitude: updateRestaurantDto.coordinate.Latitude,
      Longitude: updateRestaurantDto.coordinate.Longitude,
    };
    restaurant.rating = updateRestaurantDto.rating;
    restaurant.deliveryInfo = updateRestaurantDto.deliveryInfo;
    await restaurant.save();
    return restaurant;
  }

  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = new this.restaurantModel({
      name: createRestaurantDto.name,
      address: createRestaurantDto.address,
      restaurantPictureLink: createRestaurantDto.restaurantPictureLink,
      recommendedDish: createRestaurantDto.recommendedDish,
      tag: createRestaurantDto.tag,
      coordinate: {
        Latitude: createRestaurantDto.coordinate.Latitude,
        Longitude: createRestaurantDto.coordinate.Longitude,
      },
      rating: createRestaurantDto.rating,
      deliveryInfo: createRestaurantDto.deliveryInfo,
    });
    await restaurant.save();
    return restaurant;
  }
}
