import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Restaurant } from './restaurant.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Coordinate } from './dto/coordinate.dto';

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

  calculateDistance(coordinate1: Coordinate, coordinate2: Coordinate) {
    let R = 3958.8; // Radius of the Earth in miles
    let rlat1 = coordinate1.Latitude * (Math.PI / 180); // Convert degrees to radians
    let rlat2 = coordinate2.Latitude * (Math.PI / 180); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon =
      (coordinate2.Longitude - coordinate1.Longitude) * (Math.PI / 180); // Radian difference (longitudes)
    //Radian have value in range of [0, 2* Math.PI] negative mean go clockwise
    let d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2),
        ),
      );
    // distance {miles} change it to {km} by * 1.609344
    return d * 1.609344;
  }

  async getRandomRestaurant(
    coordinate: Coordinate,
    randomNumber: number,
    userBanListId: String[],
    range: number,
  ) {
    if (randomNumber <= 0) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Random number cannot equal or less than zero',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (range <= 0) {
      return new BadRequestException('Range cannot equal or less than zero');
    }

    const restaurant = JSON.parse(
      JSON.stringify(await this.restaurantModel.find()),
    );

    const bannedRestaurant = userBanListId;
    let remainedRestaurant = [];
    // remove restaurants in banlist
    for (let index = 0; index < restaurant.length; index++) {
      const res = restaurant[index];

      if (!bannedRestaurant.includes(res._id)) {
        remainedRestaurant.push(res);
      }
    }

    // calculate distance of remain restaurant and filter
    remainedRestaurant = remainedRestaurant.filter((e) => {
      return this.calculateDistance(coordinate, e.coordinate) <= range;
    });

    // random restaurant
    if (remainedRestaurant.length <= randomNumber) {
      return remainedRestaurant;
    } else {
      return remainedRestaurant
        .sort(() => Math.random() - Math.random())
        .slice(0, randomNumber);
    }
  }
}
