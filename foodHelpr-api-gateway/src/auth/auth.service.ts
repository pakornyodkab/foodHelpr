
import { BadRequestException, Inject, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';
import { AppService } from '../app.service';
import { ClientProxy } from '@nestjs/microservices';
import { filter, map, take } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';

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
        private jwtService: JwtService,
        @Inject('USER') private readonly userService: ClientProxy
        // private appService: AppService
    ) {}

  generateJwt(payload: any) {
    return this.jwtService.sign(payload)
  }

  async googleLogin(user: any) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    let existingUsers = []
    await this.userService.send({ cmd: 'getUsers' }, {}).forEach(exUser => existingUsers.push(exUser))
    const existingUser = existingUsers.find((e) => { e.email == user.email })
    
    console.log(`ExistingUser : ${existingUser}`);
    
    
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
      let newUser;
      await this.userService.send<CreateUserDto>({ cmd: 'createUser' }, mockData).forEach(e => newUser = e);

      console.log(`Create New User : ${newUser}`);
      
      return this.generateJwt({
        sub: newUser.user_id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  
}