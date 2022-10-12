import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  profile_picture: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  birthdate: Date;

  age: number;

  @AfterLoad()
  setAge() {
    var today = new Date();
    var birthDate = this.birthdate;
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
  }

  @Column()
  nickname: string;

  @Column()
  job: string;
}
