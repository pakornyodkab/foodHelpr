import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { Party } from './party.model';
  import { Model } from 'mongoose';
  import { InjectModel } from '@nestjs/mongoose';
  import { CreateHostPartyDto } from './dto/createHostParty.dto';
  import { Restaurant } from './restaurant.model'
  import { Coordinate } from './dto/coordinate.dto';

@Injectable()
export class PartyService {
    private LOGGER: Logger;
    private MIN_RESTAURANT_DISTANCE = 0;
    private MAX_RESTAURANT_DISTANCE = 10;
    private MIN_RESTAURANT_RANDOM_NUMBER = 1;
    private MAX_RESTAURANT_RANDOM_NUMBER = 10;

    constructor(
        @InjectModel('Party')
        private readonly partyModel: Model<Party>,
        @InjectModel('Restaurant')
        private readonly restaurantModel: Model<Restaurant>,
    ) {
        this.LOGGER = new Logger();
    }

    async getRestaurantName(coordinate: Coordinate){
        const restaurant = JSON.parse(
            JSON.stringify(await this.restaurantModel.find()),
          );
        let remainedRestaurant = [];
        remainedRestaurant = restaurant.filter((e) => {
            return this.calculateDistance(coordinate, e.coordinate) <= 10; // assuming 10 km max
          });
        
        remainedRestaurant.map(remainedRestaurant => remainedRestaurant.name);
        return remainedRestaurant
    }
    
    async getHostPartyById(id: string) {
        return await this.partyModel.findById(id);
    }

    async getHostParty() {
        return await this.partyModel.find();
    }

    async createHostParty(createPartyDto: CreateHostPartyDto) {
        const party = new this.partyModel({
            name: createPartyDto.name,
            restaurant: createPartyDto.restaurant,
            apptDate: createPartyDto.apptDate,
            memberList: createPartyDto.memberList,
            ageRestriction: createPartyDto.ageRestriction,
            maxGuests: createPartyDto.maxGuests,
            ownerId: createPartyDto.ownerId,
        })
        await party.save()
        return party;
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

}