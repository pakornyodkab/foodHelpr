
import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';

let mockData = 
    {
        username: "xxx",
        password: "123456789",
        email: "",
        firstname: "yyy",
        lastname: "zzz",
        profile_picture: "N/A",
        age: 99,
        nickname: "test",
        job: "student"
    }


@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService

    ) {}

  generateJwt(payload: any) {
    return this.jwtService.sign(payload)
  }

  async googleLogin(user: any) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const existingUser = await this.userRepository.findOne({where: { username : user.email}})
    console.log(existingUser);
    
    
    if (!existingUser) {
        return this.googleRegister(user)
    }

    return this.generateJwt({
      sub: existingUser.user_id,
      email: existingUser.email
    })
  }

  async googleRegister(user: any) {
    try {

      mockData.email = user.email
      const newUser = this.userRepository.create(mockData);

      await this.userRepository.save(newUser);
      
      return this.generateJwt({
        sub: newUser.user_id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  
}