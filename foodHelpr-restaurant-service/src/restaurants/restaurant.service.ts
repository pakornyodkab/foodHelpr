import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
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
  private LOGGER: Logger;
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
  ) {
    this.LOGGER = new Logger();
  }

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
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      { _id: id },
      updateRestaurantDto,
      { new: true },
    );

    if (!restaurant) {
      return new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Restaurant Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
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
    tags: string[],
    deliveryPlatforms: string[],
  ) {
    this.LOGGER.log(
      `Filter option In Random Restaurant : tags ${JSON.stringify(
        tags,
      )} deliveryPlatforms ${JSON.stringify(deliveryPlatforms)}`,
    );

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

    let filter = {};

    if (tags?.length > 0) {
      filter['tag'] = { $in: tags };
    }

    if (deliveryPlatforms?.length > 0) {
      filter['deliveryInfo'] = {
        $elemMatch: { platform: { $in: deliveryPlatforms } },
      };
    }

    console.log(`filter: ${JSON.stringify(filter)}`);

    const restaurant = JSON.parse(
      JSON.stringify(await this.restaurantModel.find(filter).exec()),
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
