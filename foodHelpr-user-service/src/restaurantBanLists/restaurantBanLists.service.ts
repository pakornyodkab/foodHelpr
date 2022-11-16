import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantBanList } from '../typeorm/entities/restaurantbanlist.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantBanListDto } from './dto/create-restaurantBanList.dto';

@Injectable()
export class RestaurantBanListsService {
  constructor(
    @InjectRepository(RestaurantBanList)
    private readonly restaurantBanListRepository: Repository<RestaurantBanList>,
  ) {}

  create(createRestaurantBanlistDto: CreateRestaurantBanListDto) {
    const newRestaurantBanList = this.restaurantBanListRepository.create(
      createRestaurantBanlistDto,
    );
    return this.restaurantBanListRepository.save(newRestaurantBanList);
  }

  findAll() {
    return this.restaurantBanListRepository.find();
  }

  remove(id: number) {
    this.restaurantBanListRepository.delete(id);
    return { message : "Deleted!!!"}
  }

  findBanListById(user_id: number) {
    return this.restaurantBanListRepository
      .createQueryBuilder('restaurantBanList')
      .where('restaurantBanList.user_id = :user_id', { user_id: user_id })
      .getMany();
  }
}
