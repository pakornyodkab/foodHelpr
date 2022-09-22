import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantBanList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  restaurant_id: string;
}
